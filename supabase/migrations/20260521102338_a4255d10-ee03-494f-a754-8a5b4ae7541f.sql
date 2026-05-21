
create table public.blogs (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  title text not null,
  content text not null,
  likes int not null default 0,
  created_at timestamptz not null default now()
);
create table public.blog_comments (
  id uuid primary key default gen_random_uuid(),
  blog_id uuid not null references public.blogs(id) on delete cascade,
  author_name text not null,
  content text not null,
  created_at timestamptz not null default now()
);
create table public.poll_votes (
  id uuid primary key default gen_random_uuid(),
  option text not null,
  created_at timestamptz not null default now()
);
alter table public.blogs enable row level security;
alter table public.blog_comments enable row level security;
alter table public.poll_votes enable row level security;

create policy "public read blogs" on public.blogs for select using (true);
create policy "public insert blogs" on public.blogs for insert with check (true);
create policy "public update blogs" on public.blogs for update using (true) with check (true);

create policy "public read comments" on public.blog_comments for select using (true);
create policy "public insert comments" on public.blog_comments for insert with check (true);

create policy "public read votes" on public.poll_votes for select using (true);
create policy "public insert votes" on public.poll_votes for insert with check (true);

alter publication supabase_realtime add table public.blogs;
alter publication supabase_realtime add table public.blog_comments;
alter publication supabase_realtime add table public.poll_votes;
