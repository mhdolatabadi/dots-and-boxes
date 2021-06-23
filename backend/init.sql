-- users
create table users (
  id text primary key,
  name text,
  age timestamp,
  color text,
  credit integer,
  win_rate real,
  total_score integer,
  total_game integer

);

-- games
create table games (
  id text primary key,
  is_ended boolean,
  is_waited boolean,
  size integer,
  created_date timestamp,
  end_date timestamp,
  turn text references users(id),
  winner text references users(id),
  --TODO add it to database
  --last_move_id text references moves(id)
);

--players
create table players(
  user_id text references users(id),
  game_id text references games(id)
    on delete restrict
    on update cascade,
  color text,
  has_permission boolean,
  is_connected boolean,
  role text,
  score integer,
  primary key(user_id, game_id)
);

-- messages
create table messages(
  id text primary key,
  sender_id text references users(id),
  game_id text references games(id)
    on delete restrict
    on update cascade,
  content text

);

--moves
create table moves (
  i integer,
  j integer,
  color text,
  player_id text references users(id),
  game_id text references games(id)
    on delete restrict
    on update cascade,
  primary key(player_id, game_id)

);



--reset
DELETE FROM players     
WHERE EXISTS (SELECT * FROM players);
			  
DELETE FROM users     
WHERE EXISTS (SELECT * FROM users);

DELETE FROM games     
WHERE EXISTS (SELECT * FROM games);




