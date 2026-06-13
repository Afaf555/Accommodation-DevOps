package mk.ukim.finki.wp.lab_emt.repository;

import mk.ukim.finki.wp.lab_emt.model.domain.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CountryRepository extends JpaRepository<Country,Long> {
}
