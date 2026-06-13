package mk.ukim.finki.wp.lab_emt.repository;

import mk.ukim.finki.wp.lab_emt.model.domain.Accommodation;
import mk.ukim.finki.wp.lab_emt.model.domain.Category;
import mk.ukim.finki.wp.lab_emt.model.projection.AccommodationDetailsProjection;
import mk.ukim.finki.wp.lab_emt.model.projection.AccommodationShortProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {
    List<Accommodation> findAllByIsRented(boolean isRented);
    List<Accommodation> findAllByHostId(Long hostId);
    Page<Accommodation> findAll(Pageable pageable);
    List<AccommodationShortProjection> findAllProjectedBy();
    List<AccommodationDetailsProjection> findAllDetailedProjectedBy();
    @EntityGraph(value = "Accommodation.hostAndCountry")
    List<Accommodation> findAll();
    List<Accommodation> findAllByIsRentedTrueOrderByNumRoomsDesc();

}