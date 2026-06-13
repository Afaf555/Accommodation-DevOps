package mk.ukim.finki.wp.lab_emt.service.impl;

import mk.ukim.finki.wp.lab_emt.model.domain.Accommodation;
import mk.ukim.finki.wp.lab_emt.model.domain.Reservation;
import mk.ukim.finki.wp.lab_emt.model.dto.ReservationRequestDto;
import mk.ukim.finki.wp.lab_emt.model.dto.ReservationResponseDto;
import mk.ukim.finki.wp.lab_emt.model.exception.AccommodationNotFoundException;
import mk.ukim.finki.wp.lab_emt.repository.AccommodationRepository;
import mk.ukim.finki.wp.lab_emt.repository.ReservationRepository;
import mk.ukim.finki.wp.lab_emt.service.ReservationService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final AccommodationRepository accommodationRepository;

    public ReservationServiceImpl(ReservationRepository reservationRepository,
                                  AccommodationRepository accommodationRepository) {
        this.reservationRepository = reservationRepository;
        this.accommodationRepository = accommodationRepository;
    }

    @Override
    public List<ReservationResponseDto> findAll() {
        return reservationRepository.findAll()
                .stream()
                .map(ReservationResponseDto::from)
                .toList();
    }

    @Override
    public ReservationResponseDto create(ReservationRequestDto dto) {
        Accommodation accommodation = accommodationRepository
                .findById(dto.accommodationId())
                .orElseThrow(() -> new AccommodationNotFoundException(dto.accommodationId()));

        Reservation reservation = new Reservation(accommodation, dto.numRentedRooms());
        return ReservationResponseDto.from(reservationRepository.save(reservation));
    }

    @Override
    public void deleteById(Long id) {
        reservationRepository.deleteById(id);
    }
}