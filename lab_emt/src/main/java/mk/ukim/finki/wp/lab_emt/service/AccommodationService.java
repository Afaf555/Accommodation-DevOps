package mk.ukim.finki.wp.lab_emt.service;

import mk.ukim.finki.wp.lab_emt.model.domain.Accommodation;
import mk.ukim.finki.wp.lab_emt.model.domain.Category;
import mk.ukim.finki.wp.lab_emt.model.dto.AccommodationRequestDto;
import mk.ukim.finki.wp.lab_emt.model.dto.AccommodationResponseDto;
import mk.ukim.finki.wp.lab_emt.model.dto.HostStatsDto;
import mk.ukim.finki.wp.lab_emt.model.projection.AccommodationDetailsProjection;
import mk.ukim.finki.wp.lab_emt.model.projection.AccommodationShortProjection;
import org.springframework.data.domain.Page;

import java.awt.print.Pageable;
import java.util.List;

public interface AccommodationService {
    List<Accommodation> findAll();

    Accommodation findById(Long id);

    Accommodation create(AccommodationRequestDto dto);

    Accommodation update(Long id, AccommodationRequestDto dto);

    void deleteById(Long id);

    Accommodation markAsRented(Long id);

    Page<AccommodationResponseDto> findAll(
            int page, int size, String sortBy,
            Category category, Long hostId, Long countryId,
            Integer minRooms, Boolean hasAvailableRooms);
    List<AccommodationShortProjection> findAllShort();
    List<AccommodationDetailsProjection> findAllDetails();
    List<AccommodationResponseDto> findAllWithHostAndCountry();
    List<AccommodationResponseDto> findMostPopular();
    List<HostStatsDto> findMostPopularHosts();
}