package mk.ukim.finki.wp.lab_emt.service;

import mk.ukim.finki.wp.lab_emt.model.dto.ReservationRequestDto;
import mk.ukim.finki.wp.lab_emt.model.dto.ReservationResponseDto;

import java.util.List;

public interface ReservationService {
    List<ReservationResponseDto> findAll();
    ReservationResponseDto create(ReservationRequestDto dto);
    void deleteById(Long id);
}