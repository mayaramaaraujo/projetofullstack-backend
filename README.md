# projetofullstack-backend
Projeto Full Stack Labenu

# modelagem do banco

```sql 
CREATE TABLE IF NOT EXISTS lamusic_users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    nickname VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS lamusic_genres (
    id VARCHAR(255) PRIMARY KEY,
    genre VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS lamusic_musics (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id VARCHAR(255) NOT NULL,
    date VARCHAR(255) NOT NULL,
    file VARCHAR(255) NOT NULL,
    genre VARCHAR(255) NOT NULL,
    album VARCHAR(255) NOT NULL,
    FOREIGN KEY(genre) REFERENCES lamusic_genres(id),
    FOREIGN KEY(author_id) REFERENCES lamusic_users(id)
);
```
