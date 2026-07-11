create table users (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

create table vault_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id) on delete cascade not null,
  title text not null,
  category text not null,
  encrypted_content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, title)
);

create table security_questions (
  user_id uuid references users(id) on delete cascade primary key,
  question1_id text not null,
  question2_id text not null,
  question3_id text not null,
  answer1_hash text not null,
  answer2_hash text not null,
  answer3_hash text not null
);

create table login_security (
  user_id uuid references users(id) on delete cascade primary key,
  failed_attempts int default 0,
  locked_until timestamp with time zone,
  last_login timestamp with time zone
);

alter table users enable row level security;
alter table vault_entries enable row level security;
alter table security_questions enable row level security;
alter table login_security enable row level security;

create policy "Users can view own data" on users for select using (auth.uid() = id);
create policy "Users can update own data" on users for update using (auth.uid() = id);
create policy "Users can manage own vaults" on vault_entries for all using (auth.uid() = user_id);
create policy "Users can manage own security questions" on security_questions for all using (auth.uid() = user_id);
create policy "Users can manage own login security" on login_security for all using (auth.uid() = user_id);
