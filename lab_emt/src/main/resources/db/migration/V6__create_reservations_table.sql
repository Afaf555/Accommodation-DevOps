CREATE TABLE IF NOT EXISTS reservations
(
    id               BIGSERIAL PRIMARY KEY,
    created_at       TIMESTAMP NOT NULL,
    updated_at       TIMESTAMP NOT NULL,
    accommodation_id BIGINT REFERENCES accommodations (id),
    num_rented_rooms INTEGER   NOT NULL
);