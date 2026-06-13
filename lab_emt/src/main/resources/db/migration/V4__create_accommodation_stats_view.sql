CREATE MATERIALIZED VIEW accommodation_stats_view AS
SELECT
    a.category AS category,
    COUNT(a.id) AS total_accommodations,
    SUM(a.num_rooms) AS total_rooms,
    AVG(a.num_rooms) AS avg_rooms_per_accommodation
FROM accommodations a
GROUP BY a.category;

CREATE UNIQUE INDEX idx_accommodation_stats_view_category
    ON accommodation_stats_view(category);