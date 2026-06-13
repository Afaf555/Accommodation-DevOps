package mk.ukim.finki.wp.lab_emt.service.impl;

import jakarta.transaction.Transactional;
import mk.ukim.finki.wp.lab_emt.events.AccommodationRentedEvent;
import mk.ukim.finki.wp.lab_emt.model.domain.Accommodation;
import mk.ukim.finki.wp.lab_emt.model.domain.Category;
import mk.ukim.finki.wp.lab_emt.model.domain.Condition;
import mk.ukim.finki.wp.lab_emt.model.domain.Host;
import mk.ukim.finki.wp.lab_emt.model.dto.AccommodationRequestDto;
import mk.ukim.finki.wp.lab_emt.model.dto.AccommodationResponseDto;
import mk.ukim.finki.wp.lab_emt.model.dto.AccommodationSpecification;
import mk.ukim.finki.wp.lab_emt.model.dto.HostStatsDto;
import mk.ukim.finki.wp.lab_emt.model.exception.AccommodationNotFoundException;
import mk.ukim.finki.wp.lab_emt.model.exception.HostNotFoundException;
import mk.ukim.finki.wp.lab_emt.model.projection.AccommodationDetailsProjection;
import mk.ukim.finki.wp.lab_emt.model.projection.AccommodationShortProjection;
import mk.ukim.finki.wp.lab_emt.repository.AccommodationRepository;
import mk.ukim.finki.wp.lab_emt.repository.HostRepository;
import mk.ukim.finki.wp.lab_emt.repository.ReservationRepository;
import mk.ukim.finki.wp.lab_emt.service.AccommodationService;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AccommodationServiceImpl implements AccommodationService {

    private final AccommodationRepository accommodationRepository;
    private final HostRepository hostRepository;
    private final ApplicationEventPublisher eventPublisher;
    private final ReservationRepository reservationRepository;

    public AccommodationServiceImpl(AccommodationRepository accommodationRepository,
                                    HostRepository hostRepository,
                                    ApplicationEventPublisher eventPublisher,
                                    ReservationRepository reservationRepository) {
        this.accommodationRepository = accommodationRepository;
        this.hostRepository = hostRepository;
        this.eventPublisher = eventPublisher;
        this.reservationRepository = reservationRepository;
    }
    @Override
    public List<Accommodation> findAll() {
        return accommodationRepository.findAll();
    }

    @Override
    public Accommodation findById(Long id) {
        return accommodationRepository.findById(id)
                .orElseThrow(() -> new AccommodationNotFoundException(id));
    }

    @Override
    public Accommodation create(AccommodationRequestDto dto) {
        Host host = hostRepository.findById(dto.hostId())
                .orElseThrow(() -> new HostNotFoundException(dto.hostId()));
        Accommodation accommodation = new Accommodation(
                dto.name(), dto.category(), host, dto.numRooms());
        return accommodationRepository.save(accommodation);
    }

    @Override
    public Accommodation update(Long id, AccommodationRequestDto dto) {
        Accommodation accommodation = accommodationRepository.findById(id)
                .orElseThrow(() -> new AccommodationNotFoundException(id));
        Host host = hostRepository.findById(dto.hostId())
                .orElseThrow(() -> new HostNotFoundException(dto.hostId()));
        accommodation.setName(dto.name());
        accommodation.setCategory(dto.category());
        accommodation.setNumRooms(dto.numRooms());
        accommodation.setHost(host);
        return accommodationRepository.save(accommodation);
    }

    @Override
    public void deleteById(Long id) {
        if (!accommodationRepository.existsById(id)) {
            throw new AccommodationNotFoundException(id);
        }
        accommodationRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Accommodation markAsRented(Long id) {
        Accommodation accommodation = accommodationRepository.findById(id)
                .orElseThrow(() -> new AccommodationNotFoundException(id));

        accommodation.setRented(true);
        accommodation.setCondition(Condition.GOOD);

        Accommodation saved = accommodationRepository.save(accommodation);

        eventPublisher.publishEvent(new AccommodationRentedEvent(saved));

        return saved;
    }

    @Override
    public Page<AccommodationResponseDto> findAll(
            int page, int size, String sortBy,
            Category category, Long hostId, Long countryId,
            Integer minRooms, Boolean hasAvailableRooms) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));

        List<AccommodationResponseDto> filtered = accommodationRepository
                .findAll(pageable)
                .stream()
                .filter(a -> category == null || a.getCategory() == category)
                .filter(a -> hostId == null || a.getHost().getId().equals(hostId))
                .filter(a -> countryId == null || a.getHost().getCountry().getId().equals(countryId))
                .filter(a -> minRooms == null || a.getNumRooms() >= minRooms)
                .filter(a -> hasAvailableRooms == null || !a.isRented())
                .map(AccommodationResponseDto::from)
                .toList();

        return new PageImpl<>(filtered, pageable, filtered.size());
    }

    @Override
    public List<AccommodationShortProjection> findAllShort() {
        return accommodationRepository.findAllProjectedBy();
    }

    @Override
    public List<AccommodationDetailsProjection> findAllDetails() {
        return accommodationRepository.findAllDetailedProjectedBy();
    }

    @Override
    public List<AccommodationResponseDto> findAllWithHostAndCountry() {
        return accommodationRepository.findAll()
                .stream()
                .map(AccommodationResponseDto::from)
                .toList();
    }
    @Override
    public List<AccommodationResponseDto> findMostPopular() {
        return accommodationRepository.findAll()
                .stream()
                .sorted((a1, a2) -> {
                    long rooms1 = reservationRepository.findAllByAccommodationId(a1.getId())
                            .stream()
                            .mapToLong(r -> r.getNumRentedRooms())
                            .sum();
                    long rooms2 = reservationRepository.findAllByAccommodationId(a2.getId())
                            .stream()
                            .mapToLong(r -> r.getNumRentedRooms())
                            .sum();
                    return Long.compare(rooms2, rooms1);
                })
                .map(AccommodationResponseDto::from)
                .toList();
    }
    @Override
    public List<HostStatsDto> findMostPopularHosts() {
        return hostRepository.findAll()
                .stream()
                .map(host -> {
                    List<Accommodation> hostAccommodations = accommodationRepository
                            .findAllByHostId(host.getId());

                    long totalAccommodations = hostAccommodations.size();

                    long goodAccommodations = hostAccommodations.stream()
                            .filter(a -> a.getCondition() == Condition.GOOD)
                            .count();

                    long badAccommodations = hostAccommodations.stream()
                            .filter(a -> a.getCondition() == Condition.BAD)
                            .count();

                    long rentedRooms = hostAccommodations.stream()
                            .flatMap(a -> reservationRepository
                                    .findAllByAccommodationId(a.getId()).stream())
                            .mapToLong(r -> r.getNumRentedRooms())
                            .sum();

                    return new HostStatsDto(
                            host.getId(),
                            totalAccommodations,
                            new HostStatsDto.ConditionsDto(goodAccommodations, badAccommodations),
                            rentedRooms
                    );
                })
                .sorted((h1, h2) -> Long.compare(h2.rentedRooms(), h1.rentedRooms()))
                .toList();
    }
}
