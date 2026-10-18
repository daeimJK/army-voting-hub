create extension if not exists pgcrypto;
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  nickname text not null default 'ARMY',
  region text not null default 'INTL' check (region in ('AU','INTL')),
  role text not null default 'user' check (role in ('user','moderator','admin')),
  created_at timestamptz not null default now()
);
create table if not exists public.awards (id text primary key, active boolean not null default true, content jsonb not null, updated_at timestamptz not null default now());
create table if not exists public.missions (id text primary key, active boolean not null default true, content jsonb not null, updated_at timestamptz not null default now());
create table if not exists public.badge_definitions (id text primary key, active boolean not null default true, content jsonb not null, updated_at timestamptz not null default now());
create table if not exists public.proofs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  mission_id text not null,
  mission_day text not null,
  quantity integer,
  post_url text,
  evidence_path text,
  status text not null default 'pending' check (status in ('pending','verified','resubmit','rejected')),
  review_note text,
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, mission_id, mission_day)
);
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$ begin
  insert into public.profiles(id,email,nickname,region)
  values(new.id,new.email,coalesce(new.raw_user_meta_data->>'nickname','ARMY'),coalesce(new.raw_user_meta_data->>'region','INTL'));
  return new; end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
create or replace function public.is_staff(uid uuid) returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from public.profiles where id=uid and role in ('admin','moderator')); $$;
alter table public.profiles enable row level security;alter table public.awards enable row level security;alter table public.missions enable row level security;alter table public.badge_definitions enable row level security;alter table public.proofs enable row level security;
create policy "public read awards" on public.awards for select using(active=true);
create policy "public read missions" on public.missions for select using(active=true);
create policy "public read badges" on public.badge_definitions for select using(active=true);
create policy "read own profile" on public.profiles for select using(auth.uid()=id or public.is_staff(auth.uid()));
create policy "update own profile" on public.profiles for update using(auth.uid()=id) with check(auth.uid()=id);
create policy "insert own proofs" on public.proofs for insert with check(auth.uid()=user_id);
create policy "read own proofs or staff" on public.proofs for select using(auth.uid()=user_id or public.is_staff(auth.uid()));
create policy "resubmit own proof" on public.proofs for update using(auth.uid()=user_id and status='resubmit') with check(auth.uid()=user_id);
create policy "staff update awards" on public.awards for all using(public.is_staff(auth.uid())) with check(public.is_staff(auth.uid()));
create policy "staff update missions" on public.missions for all using(public.is_staff(auth.uid())) with check(public.is_staff(auth.uid()));
create policy "staff update badges" on public.badge_definitions for all using(public.is_staff(auth.uid())) with check(public.is_staff(auth.uid()));
create or replace function public.review_proof(proof_id uuid,new_status text,note text default null) returns void language plpgsql security definer set search_path=public as $$ begin
  if not public.is_staff(auth.uid()) then raise exception 'not authorised'; end if;
  if new_status not in ('verified','resubmit','rejected') then raise exception 'invalid status'; end if;
  update public.proofs set status=new_status,review_note=note,reviewed_by=auth.uid(),reviewed_at=now(),updated_at=now() where id=proof_id;
end; $$;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('proofs','proofs',false,5242880,array['image/png','image/jpeg','image/webp']) on conflict(id) do update set public=false,file_size_limit=5242880,allowed_mime_types=array['image/png','image/jpeg','image/webp'];
create policy "upload own proof files" on storage.objects for insert to authenticated with check(bucket_id='proofs' and (storage.foldername(name))[1]=auth.uid()::text);
create policy "read own proof files" on storage.objects for select to authenticated using(bucket_id='proofs' and ((storage.foldername(name))[1]=auth.uid()::text or public.is_staff(auth.uid())));
create policy "delete own proof files" on storage.objects for delete to authenticated using(bucket_id='proofs' and (storage.foldername(name))[1]=auth.uid()::text);
