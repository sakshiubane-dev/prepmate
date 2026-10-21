begin;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  branch text,
  target_role text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_roles (
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null check (role in ('student', 'admin')),
  granted_by uuid references auth.users (id) on delete set null,
  granted_at timestamptz not null default now(),
  primary key (user_id, role)
);

create table public.lesson_progress (
  id bigint generated always as identity primary key,
  user_id Error: query: Too small: expected string to have >=1 charactersuuid not null references auth.users (id) on delete cascade,
  subject_id text not null,
  lesson_id text not null,
  completed boolean not null default true,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, subject_id, lesson_id)
);

create table public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  subject_id text not null,
  lesson_id text,
  quiz_id text not null,
  score numeric(5, 2) check (score between 0 and 100),
  question_count integer not null check (question_count > 0),
  correct_count integer not null check (correct_count >= 0 and correct_count <= question_count),
  answers jsonb not null default '{}'::jsonb,
  attempted_at timestamptz not null default now()
);

create table public.study_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  subject_id text,
  lesson_id text,
  title text not null check (length(trim(title)) > 0),
  content text not null default '',
  storage_path text,
  tags text[] not null default '{}'::text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.interview_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  interview_type text not null,
  status text not null default 'completed' check (status in ('started', 'completed', 'abandoned')),
  score numeric(5, 2) check (score between 0 and 100),
  feedback jsonb,
  transcript jsonb,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create index user_roles_role_idx on public.user_roles (role);
create index lesson_progress_user_subject_idx on public.lesson_progress (user_id, subject_id);
create index quiz_attempts_user_time_idx on public.quiz_attempts (user_id, attempted_at desc);
create index quiz_attempts_subject_lesson_idx on public.quiz_attempts (subject_id, lesson_id);
create index study_notes_user_time_idx on public.study_notes (user_id, updated_at desc);
create index study_notes_subject_lesson_idx on public.study_notes (subject_id, lesson_id);
create index interview_sessions_user_time_idx on public.interview_sessions (user_id, started_at desc);

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.study_notes enable row level security;
alter table public.interview_sessions enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "Users can create their own profile"
  on public.profiles for insert
  to authenticated
  with check ((select auth.uid()) = id);

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "Users can read their own roles"
  on public.user_roles for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can read their own lesson progress"
  on public.lesson_progress for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can create their own lesson progress"
  on public.lesson_progress for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update their own lesson progress"
  on public.lesson_progress for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can read their own quiz attempts"
  on public.quiz_attempts for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can read their own study notes"
  on public.study_notes for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can create their own private study notes"
  on public.study_notes for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update their own study notes"
  on public.study_notes for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their own study notes"
  on public.study_notes for delete
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can read their own interview sessions"
  on public.interview_sessions for select
  to authenticated
  using ((select auth.uid()) = user_id);

commit;