CREATE TABLE IF NOT EXISTS countries
(
    id        BIGSERIAL PRIMARY KEY,
    name      VARCHAR(255) NOT NULL,
    continent VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS hosts
(
    id         BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    name       VARCHAR(255) NOT NULL,
    surname    VARCHAR(255) NOT NULL,
    country_id BIGINT REFERENCES countries (id)
);

CREATE TABLE IF NOT EXISTS accommodations
(
    id         BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    name       VARCHAR(255) NOT NULL,
    category   VARCHAR(50)  NOT NULL,
    condition  VARCHAR(50)  NOT NULL DEFAULT 'GOOD',
    host_id    BIGINT REFERENCES hosts (id),
    num_rooms  INTEGER      NOT NULL,
    is_rented  BOOLEAN      NOT NULL DEFAULT FALSE
);