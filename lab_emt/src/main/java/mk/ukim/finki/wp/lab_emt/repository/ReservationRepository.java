package mk.ukim.finki.wp.lab_emt.repository;

import mk.ukim.finki.wp.lab_emt.model.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findAllByAccommodationId(Long accommodationId);
    List<Reservation> findAll();
}