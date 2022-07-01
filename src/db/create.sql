CREATE TABLE following(
    screen_name TEXT,
    user_id TEXT NOT NULL,
    following_id TEXT NOT NULL
);

CREATE TABLE BACKLOG(
    ID SERIAL PRIMARY KEY,
    TWEET TEXT NOT NULL
);
