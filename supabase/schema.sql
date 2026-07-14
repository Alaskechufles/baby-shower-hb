-- Baby Shower de nuestra bebé — schema for gift registry
-- Run this once in the Supabase SQL editor (or via `supabase db push`).

create table if not exists gifts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  needed int not null default 1,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists gift_claims (
  id uuid primary key default gen_random_uuid(),
  gift_id uuid not null references gifts(id) on delete cascade,
  guest_name text not null,
  qty int not null default 1,
  created_at timestamptz not null default now()
);

create index if not exists gift_claims_gift_id_idx on gift_claims(gift_id);

create table if not exists rsvps (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  attending boolean not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Lets the seed block below upsert by name instead of only inserting once,
-- so re-running this file after editing the list updates quantities in place.
create unique index if not exists gifts_name_uidx on gifts (name);

alter table gifts enable row level security;
alter table gift_claims enable row level security;
alter table rsvps enable row level security;

drop policy if exists "gifts are publicly readable" on gifts;
create policy "gifts are publicly readable" on gifts for select using (true);

drop policy if exists "gift claims are publicly readable" on gift_claims;
create policy "gift claims are publicly readable" on gift_claims for select using (true);

drop policy if exists "rsvps are publicly readable" on rsvps;
create policy "rsvps are publicly readable" on rsvps for select using (true);

-- No direct insert/update/delete policies are granted: writes only happen
-- through the security-definer RPCs below, which lock the gift row and
-- re-check the remaining quantity before inserting a claim. This avoids a
-- race where two guests claim the last spot on a gift at the same time.

create or replace function claim_gift(p_gift_id uuid, p_guest_name text, p_qty int default 1)
returns gift_claims
language plpgsql
security definer
set search_path = public
as $$
declare
  v_needed int;
  v_claimed int;
  v_claim gift_claims;
begin
  if p_guest_name is null or btrim(p_guest_name) = '' then
    raise exception 'guest name is required';
  end if;
  if p_qty is null or p_qty < 1 then
    p_qty := 1;
  end if;

  select needed into v_needed from gifts where id = p_gift_id for update;
  if not found then
    raise exception 'gift not found';
  end if;

  select coalesce(sum(qty), 0) into v_claimed from gift_claims where gift_id = p_gift_id;

  if v_claimed + p_qty > v_needed then
    raise exception 'gift already complete';
  end if;

  insert into gift_claims (gift_id, guest_name, qty)
  values (p_gift_id, btrim(p_guest_name), p_qty)
  returning * into v_claim;

  return v_claim;
end;
$$;

-- Normalizes a guest's name for comparison (trim + lowercase + collapse
-- whitespace) so "Ana  Prueba", "ana prueba" and "Ana Prueba" all match.
create or replace function normalize_guest_name(p_name text)
returns text
language sql
immutable
as $$
  select lower(regexp_replace(btrim(coalesce(p_name, '')), '\s+', ' ', 'g'));
$$;

-- One RSVP per guest (by normalized name); answering again updates it in
-- place instead of creating a second row, so changing your mind just works.
create unique index if not exists rsvps_guest_name_uidx on rsvps (normalize_guest_name(guest_name));

create or replace function set_rsvp(p_guest_name text, p_attending boolean)
returns rsvps
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row rsvps;
begin
  if p_guest_name is null or btrim(p_guest_name) = '' then
    raise exception 'guest name is required';
  end if;

  insert into rsvps (guest_name, attending, updated_at)
  values (btrim(p_guest_name), p_attending, now())
  on conflict (normalize_guest_name(guest_name)) do update
    set attending = excluded.attending,
        updated_at = now()
  returning * into v_row;

  return v_row;
end;
$$;

-- Looks up a guest's own RSVP by normalized name, so any device that enters
-- the same name sees (and can change) the answer already on file.
create or replace function get_my_rsvp(p_guest_name text)
returns rsvps
language sql
stable
security definer
set search_path = public
as $$
  select * from rsvps where normalize_guest_name(guest_name) = normalize_guest_name(p_guest_name) limit 1;
$$;

-- Requires the caller's name to match the claim's guest_name (normalized),
-- so a guest can only unclaim their own gifts -- from any device, just by
-- entering the same name again -- and can't unclaim someone else's, even
-- though claim ids are visible to every guest (needed to show progress bars).
drop function if exists unclaim_gift(uuid);
create or replace function unclaim_gift(p_claim_id uuid, p_guest_name text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_deleted int;
begin
  delete from gift_claims
  where id = p_claim_id
    and normalize_guest_name(guest_name) = normalize_guest_name(p_guest_name)
  returning 1 into v_deleted;

  if v_deleted is null then
    raise exception 'No tienes permiso para desmarcar este regalo';
  end if;
end;
$$;

grant execute on function claim_gift(uuid, text, int) to anon, authenticated;
grant execute on function unclaim_gift(uuid, text) to anon, authenticated;
grant execute on function set_rsvp(text, boolean) to anon, authenticated;
grant execute on function get_my_rsvp(text) to anon, authenticated;

-- "Enterizos con pies" and "Enterizos sin pies" were merged into a single
-- "Enterizos de bebé" entry below; drop the old split rows if present.
delete from gifts where name in ('Enterizos con pies', 'Enterizos sin pies');

-- Seed/update the gift list. Upserts by name, so editing a quantity or
-- description here and re-running this file updates the existing row
-- instead of skipping (this is what makes it safe to re-run any time the
-- list changes, not just on a fresh database).
insert into gifts (name, description, needed, sort_order) values
  ('Shampoo de manzanilla', 'Suave para el cabello de nuestra bebé', 2, 1),
  ('Pañales RN', 'Uno o dos paquetes, de marcas diferentes', 6, 2),
  ('Maicena', 'Para el cuidado de la piel', 1, 3),
  ('Extractor manual de leche', 'Para la lactancia', 1, 4),
  ('Bolsas / compresas calientes', 'Alivio para mamá', 2, 5),
  ('Mantas', 'Muchas, de diferentes tipos y tamaños', 10, 6),
  ('Chupones', 'Para nuestra bebé', 1, 7),
  ('Peluche grande', 'De 50 a 60 cm', 1, 8),
  ('Silla mecedora de bebé', 'Para arrullar a nuestra bebé', 1, 9),
  ('Fular portabebé', 'Tela de 50cm x 3m', 1, 10),
  ('Canguro portabebé', 'Para cargar a nuestra bebé', 1, 11),
  ('Enterizos de bebé', 'Con y sin pies, ropa de recién nacida', 5, 12),
  ('Set de peinado de recién nacido', 'Cepillo y peine suaves', 1, 13),
  ('Set de cuidado de uñas', 'Tijeritas y lima de bebé', 1, 14),
  ('Aceite de bebé', 'Para masajes e hidratación', 1, 15),
  ('Crema humectante para bebé', 'Piel sensible', 1, 16),
  ('Jabón de glicerina natural', 'Para bebé', 1, 17),
  ('Accesorios para niña', 'Vinchas, ganchitos, etc.', 10, 18),
  ('Zapatos o medias antideslizantes', 'De tela, para bebé', 3, 19),
  ('Biberones de vidrio', 'Para alimentación', 2, 20),
  ('Bolsas para almacenar leche materna', 'Paquete, para congelar', 5, 21),
  ('Ropa maternal para mamá', 'Buzos, enterizos, vestidos, overalls', 10, 22),
  ('Brasier de lactancia', 'Talla 38-40', 3, 23),
  ('Pelota de yoga', 'Para el postparto', 1, 24),
  ('Pañales para adulto', 'Para el postparto de mamá', 3, 25),
  ('Sorpréndenos', 'Cualquier otra cosa útil para mamá o nuestra bebé en estos primeros meses', 3, 26)
on conflict (name) do update
  set description = excluded.description,
      needed = excluded.needed,
      sort_order = excluded.sort_order;

-- Enable realtime so every guest sees claims update live.
do $$
begin
  execute 'alter publication supabase_realtime add table gift_claims';
exception when others then
  raise notice 'Could not add gift_claims to supabase_realtime publication (it may already be enabled): %', sqlerrm;
end $$;
