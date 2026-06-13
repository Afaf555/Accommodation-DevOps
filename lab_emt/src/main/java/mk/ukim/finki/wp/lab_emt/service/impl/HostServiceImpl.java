package mk.ukim.finki.wp.lab_emt.service.impl;

import mk.ukim.finki.wp.lab_emt.model.domain.Accommodation;
import mk.ukim.finki.wp.lab_emt.model.domain.Condition;
import mk.ukim.finki.wp.lab_emt.model.domain.Host;
import mk.ukim.finki.wp.lab_emt.model.dto.HostStatsDto;
import mk.ukim.finki.wp.lab_emt.model.exception.HostNotFoundException;
import mk.ukim.finki.wp.lab_emt.repository.AccommodationRepository;
import mk.ukim.finki.wp.lab_emt.repository.HostRepository;
import mk.ukim.finki.wp.lab_emt.service.HostService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HostServiceImpl implements HostService {

    private final AccommodationRepository accommodationRepository;
    private final HostRepository hostRepository;

    public HostServiceImpl(AccommodationRepository accommodationRepository,
                           HostRepository hostRepository) {
        this.accommodationRepository = accommodationRepository;
        this.hostRepository = hostRepository;
    }

    @Override
    public HostStatsDto getHostStats(Long hostId) {
        Host host = hostRepository.findById(hostId)
                .orElseThrow(() -> new HostNotFoundException(hostId));

        List<Accommodation> accommodations = accommodationRepository
                .findAllByHostId(hostId);

        long totalAccommodations = accommodations.size();

        long goodAccommodations = accommodations.stream()
                .filter(a -> a.getCondition() == Condition.GOOD)
                .count();

        long badAccommodations = accommodations.stream()
                .filter(a -> a.getCondition() == Condition.BAD)
                .count();

//        long totalRooms = accommodations.stream()
//                .mapToLong(Accommodation::getNumRooms)
//                .sum();

        long rentedRooms = accommodations.stream()
                .filter(Accommodation::isRented)
                .mapToLong(Accommodation::getNumRooms)
                .sum();

        return new HostStatsDto(
               host.getId(),
//                host.getName(),
//                host.getSurname(),
                totalAccommodations,
                new HostStatsDto.ConditionsDto(goodAccommodations, badAccommodations),
//                totalRooms,
                rentedRooms
        );
    }
}