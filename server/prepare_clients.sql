-- Canonical prepare_clients table for the agreement form.
-- Columns used by the app: full_name, email, date_of_birth, phone, occupation, instructed_person_slug.
-- occupation is optional (nullable). Blank values are stored as NULL.
-- Run this once in the Supabase SQL editor.

create or replace function public.prepare_clients_normalize_email_and_trim()
returns trigger
language plpgsql
as $$
begin
  new.full_name := btrim(new.full_name);
  new.email := lower(btrim(new.email));
  if new.phone is not null then
    new.phone := nullif(btrim(new.phone), '');
  end if;
  if new.occupation is not null then
    new.occupation := nullif(btrim(new.occupation), '');
  end if;
  if new.instructed_person_slug is not null then
    new.instructed_person_slug := nullif(btrim(new.instructed_person_slug), '');
  end if;
  return new;
end;
$$;

alter table public.prepare_clients drop column if exists address;
alter table public.prepare_clients drop column if exists pdf_path;
alter table public.prepare_clients drop column if exists pdf_text;

alter table public.prepare_clients add column if not exists email text;
alter table public.prepare_clients add column if not exists phone text;
alter table public.prepare_clients add column if not exists occupation text;
alter table public.prepare_clients add column if not exists date_of_birth date;
alter table public.prepare_clients add column if not exists instructed_person_slug text;

update public.prepare_clients
set email = lower(btrim(email))
where email is not null;

alter table public.prepare_clients
  alter column full_name set not null,
  alter column email set not null,
  alter column date_of_birth set not null;

alter table public.prepare_clients drop constraint if exists prepare_clients_dob_not_in_future;
alter table public.prepare_clients drop constraint if exists prepare_clients_email_lowercase;
alter table public.prepare_clients drop constraint if exists prepare_clients_email_valid;
alter table public.prepare_clients drop constraint if exists prepare_clients_full_name_trimmed_len;

alter table public.prepare_clients
  add constraint prepare_clients_dob_not_in_future check (date_of_birth <= CURRENT_DATE),
  add constraint prepare_clients_email_lowercase check (email = lower(email)),
  add constraint prepare_clients_email_valid check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  add constraint prepare_clients_full_name_trimmed_len check (char_length(btrim(full_name)) >= 1);

drop trigger if exists trg_prepare_clients_normalize on public.prepare_clients;
create trigger trg_prepare_clients_normalize
before insert or update on public.prepare_clients
for each row
execute function public.prepare_clients_normalize_email_and_trim();

notify pgrst, 'reload schema';
