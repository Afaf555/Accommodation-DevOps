package mk.ukim.finki.wp.lab_emt.repository;

import mk.ukim.finki.wp.lab_emt.model.views.AccommodationStatsView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AccommodationStatsViewRepository
        extends JpaRepository<AccommodationStatsView, String> {

    @Modifying
    @Query(value = "REFRESH MATERIALIZED VIEW CONCURRENTLY accommodation_stats_view",
            nativeQuery = true)
    void refresh();
}