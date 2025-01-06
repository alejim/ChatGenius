-- Migrations will appear here as you chat with AI

create table users (
  id bigint primary key generated always as identity,
  username text not null unique,
  email text not null unique,
  password_hash text not null,
  created_at timestamp with time zone default now() not null
);

create table channels (
  id bigint primary key generated always as identity,
  name text not null unique,
  description text,
  created_at timestamp with time zone default now() not null
);

create table messages (
  id bigint primary key generated always as identity,
  user_id bigint not null references users (id),
  channel_id bigint references channels (id),
  recipient_id bigint references users (id),
  content text not null,
  sent_at timestamp with time zone default now() not null
);

create table channel_memberships (
  id bigint primary key generated always as identity,
  user_id bigint not null references users (id),
  channel_id bigint not null references channels (id),
  joined_at timestamp with time zone default now() not null
);

create unique index unique_user_channel on channel_memberships using btree (user_id, channel_id);

create table user_sessions (
  id bigint primary key generated always as identity,
  user_id bigint not null references users (id),
  session_token text not null unique,
  created_at timestamp with time zone default now() not null,
  expires_at timestamp with time zone not null
);

create table user_roles (
  id bigint primary key generated always as identity,
  user_id bigint not null references users (id),
  role text not null,
  assigned_at timestamp with time zone default now() not null
);

create table files (
  id bigint primary key generated always as identity,
  user_id bigint not null references users (id),
  channel_id bigint references channels (id),
  file_name text not null,
  file_path text not null,
  uploaded_at timestamp with time zone default now() not null
);

create table user_status (
  id bigint primary key generated always as identity,
  user_id bigint not null references users (id),
  status text not null,
  last_active timestamp with time zone default now() not null
);