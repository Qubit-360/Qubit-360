-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- SERVICES TABLE
create table if not exists services (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  icon text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- WORKS TABLE (Projects)
create table if not exists works (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  description text not null,
  full_description text not null,
  challenge text,
  solution text,
  tech_stack text[], -- Array of strings
  tag text,
  image_url text,
  link text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- EXPERIMENTS TABLE (Innovation Lab)
create table if not exists experiments (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  description text not null,
  full_description text,
  status text,
  progress integer,
  tag text,
  tech_stack text[],
  link text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table services enable row level security;
alter table works enable row level security;
alter table experiments enable row level security;

-- Policies (Assuming public read, admin write)
-- Note: customizable based on Auth setup. For now, allowing full access to authenticated users (admins) and read-only to public (anon).

-- Policy for Services
create policy "Public services are viewable by everyone."
  on services for select
  using ( true );

create policy "Users can insert their own services."
  on services for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can update their own services."
  on services for update
  using ( auth.role() = 'authenticated' );

create policy "Users can delete their own services."
  on services for delete
  using ( auth.role() = 'authenticated' );

-- Policy for Works
create policy "Public works are viewable by everyone."
  on works for select
  using ( true );

create policy "Authenticated users can insert works."
  on works for insert
  with check ( auth.role() = 'authenticated' );

create policy "Authenticated users can update works."
  on works for update
  using ( auth.role() = 'authenticated' );

create policy "Authenticated users can delete works."
  on works for delete
  using ( auth.role() = 'authenticated' );

-- Policy for Experiments
create policy "Public experiments are viewable by everyone."
  on experiments for select
  using ( true );

create policy "Authenticated users can insert experiments."
  on experiments for insert
  with check ( auth.role() = 'authenticated' );

create policy "Authenticated users can update experiments."
  on experiments for update
  using ( auth.role() = 'authenticated' );

create policy "Authenticated users can delete experiments."
  on experiments for delete
  using ( auth.role() = 'authenticated' );
