package mk.ukim.finki.wp.lab_emt.model.dto;

import jakarta.persistence.criteria.Join;
import mk.ukim.finki.wp.lab_emt.model.domain.Accommodation;
import mk.ukim.finki.wp.lab_emt.model.domain.Category;
import mk.ukim.finki.wp.lab_emt.model.domain.Country;
import mk.ukim.finki.wp.lab_emt.model.domain.Host;
import org.springframework.data.jpa.domain.Specification;

public class AccommodationSpecification {

    public static Specification<Accommodation> withFilters(
            Category category,
            Long hostId,
            Long countryId,
            Integer minRooms,
            Boolean hasAvailableRooms) {

        return Specification
                .where(hasCategory(category))
                .and(hasHost(hostId))
                .and(hasCountry(countryId))
                .and(hasMinRooms(minRooms))
                .and(hasAvailableRooms(hasAvailableRooms));
    }

    private static Specification<Accommodation> hasCategory(Category category) {
        return (root, query, cb) ->
                category == null ? null : cb.equal(root.get("category"), category);
    }

    private static Specification<Accommodation> hasHost(Long hostId) {
        return (root, query, cb) ->
                hostId == null ? null : cb.equal(root.get("host").get("id"), hostId);
    }

    private static Specification<Accommodation> hasCountry(Long countryId) {
        return (root, query, cb) -> {
            if (countryId == null) return null;
            Join<Accommodation, Host> host = root.join("host");
            Join<Host, Country> country = host.join("country");
            return cb.equal(country.get("id"), countryId);
        };
    }

    private static Specification<Accommodation> hasMinRooms(Integer minRooms) {
        return (root, query, cb) ->
                minRooms == null ? null : cb.greaterThanOrEqualTo(root.get("numRooms"), minRooms);
    }

    private static Specification<Accommodation> hasAvailableRooms(Boolean hasAvailableRooms) {
        return (root, query, cb) ->
                hasAvailableRooms == null ? null : cb.equal(root.get("isRented"), false);
    }
}