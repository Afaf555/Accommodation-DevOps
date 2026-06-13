package mk.ukim.finki.wp.lab_emt.web;

import jakarta.validation.Valid;
import java.util.List;

import mk.ukim.finki.wp.lab_emt.model.domain.Category;
import mk.ukim.finki.wp.lab_emt.model.dto.AccommodationRequestDto;
import mk.ukim.finki.wp.lab_emt.model.dto.AccommodationResponseDto;
import mk.ukim.finki.wp.lab_emt.model.dto.HostStatsDto;
import mk.ukim.finki.wp.lab_emt.model.projection.AccommodationDetailsProjection;
import mk.ukim.finki.wp.lab_emt.model.projection.AccommodationShortProjection;
import mk.ukim.finki.wp.lab_emt.service.AccommodationService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accommodations")
public class AccommodationController {

    private final AccommodationService accommodationService;

    public AccommodationController(AccommodationService accommodationService) {
        this.accommodationService = accommodationService;
    }

    @GetMapping
    public ResponseEntity<List<AccommodationResponseDto>> findAll() {
        return ResponseEntity.ok(accommodationService.findAll()
                .stream()
                .map(AccommodationResponseDto::from)
                .toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccommodationResponseDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(
                AccommodationResponseDto.from(accommodationService.findById(id)));
    }

    @PostMapping("/add")
    public ResponseEntity<AccommodationResponseDto> create(
            @RequestBody @Valid AccommodationRequestDto dto) {
        return ResponseEntity.ok(
                AccommodationResponseDto.from(accommodationService.create(dto)));
    }

    @PutMapping("/{id}/edit")
    public ResponseEntity<AccommodationResponseDto> update(
            @PathVariable Long id,
            @RequestBody @Valid AccommodationRequestDto dto) {
        return ResponseEntity.ok(
                AccommodationResponseDto.from(accommodationService.update(id, dto)));
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        accommodationService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/rent")
    public ResponseEntity<AccommodationResponseDto> markAsRented(@PathVariable Long id) {
        return ResponseEntity.ok(
                AccommodationResponseDto.from(accommodationService.markAsRented(id)));
    }
    @GetMapping("/paged")
    public ResponseEntity<Page<AccommodationResponseDto>> findAllPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) Long hostId,
            @RequestParam(required = false) Long countryId,
            @RequestParam(required = false) Integer minRooms,
            @RequestParam(required = false) Boolean hasAvailableRooms
    ) {
        return ResponseEntity.ok(
                accommodationService.findAll(
                        page, size, sortBy,
                        category, hostId, countryId,
                        minRooms, hasAvailableRooms));
    }

    @GetMapping("/short")
    public ResponseEntity<List<AccommodationShortProjection>> findAllShort() {
        return ResponseEntity.ok(accommodationService.findAllShort());
    }

    @GetMapping("/details")
    public ResponseEntity<List<AccommodationDetailsProjection>> findAllDetails() {
        return ResponseEntity.ok(accommodationService.findAllDetails());
    }
    @GetMapping("/with-host-country")
    public ResponseEntity<List<AccommodationResponseDto>> findAllWithHostAndCountry() {
        return ResponseEntity.ok(accommodationService.findAllWithHostAndCountry());
    }
    @GetMapping("/most-popular")
    public ResponseEntity<List<AccommodationResponseDto>> findMostPopular() {
        return ResponseEntity.ok(accommodationService.findMostPopular());
    }

    @GetMapping("/most-popular-hosts")
    public ResponseEntity<List<HostStatsDto>> findMostPopularHosts() {
        return ResponseEntity.ok(accommodationService.findMostPopularHosts());
    }

}