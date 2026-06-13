-- Countries
INSERT INTO countries (name, continent) VALUES ('Macedonia', 'Europe');
INSERT INTO countries (name, continent) VALUES ('Germany', 'Europe');
INSERT INTO countries (name, continent) VALUES ('USA', 'North America');
INSERT INTO countries (name, continent) VALUES ('Japan', 'Asia');
INSERT INTO countries (name, continent) VALUES ('Australia', 'Australia');

-- Hosts
INSERT INTO hosts (created_at, updated_at, name, surname, country_id) VALUES (NOW(), NOW(), 'Aleksandar', 'Trajkovski', 1);
INSERT INTO hosts (created_at, updated_at, name, surname, country_id) VALUES (NOW(), NOW(), 'Marija', 'Ivanova', 1);
INSERT INTO hosts (created_at, updated_at, name, surname, country_id) VALUES (NOW(), NOW(), 'Hans', 'Muller', 2);
INSERT INTO hosts (created_at, updated_at, name, surname, country_id) VALUES (NOW(), NOW(), 'John', 'Smith', 3);
INSERT INTO hosts (created_at, updated_at, name, surname, country_id) VALUES (NOW(), NOW(), 'Yuki', 'Tanaka', 4);

-- Accommodations
INSERT INTO accommodations (created_at, updated_at, name, category, condition, host_id, num_rooms, is_rented) VALUES (NOW(), NOW(), 'Cozy Room Skopje', 'ROOM', 'GOOD', 1, 1, FALSE);
INSERT INTO accommodations (created_at, updated_at, name, category, condition, host_id, num_rooms, is_rented) VALUES (NOW(), NOW(), 'Mountain House', 'HOUSE', 'GOOD', 2, 4, FALSE);
INSERT INTO accommodations (created_at, updated_at, name, category, condition, host_id, num_rooms, is_rented) VALUES (NOW(), NOW(), 'Berlin Flat', 'FLAT', 'GOOD', 3, 2, FALSE);
INSERT INTO accommodations (created_at, updated_at, name, category, condition, host_id, num_rooms, is_rented) VALUES (NOW(), NOW(), 'NYC Apartment', 'APARTMENT', 'GOOD', 4, 3, TRUE);
INSERT INTO accommodations (created_at, updated_at, name, category, condition, host_id, num_rooms, is_rented) VALUES (NOW(), NOW(), 'Tokyo Hotel', 'HOTEL', 'GOOD', 5, 10, FALSE);
INSERT INTO accommodations (created_at, updated_at, name, category, condition, host_id, num_rooms, is_rented) VALUES (NOW(), NOW(), 'Old Motel', 'MOTEL', 'BAD', 1, 5, FALSE);