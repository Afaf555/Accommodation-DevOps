package mk.ukim.finki.wp.lab_emt.model.dto;

import mk.ukim.finki.wp.lab_emt.model.domain.Reservation;

public record ReservationResponseDto(
        Long id,
        Long accommodationId,
        String accommodationName,
        Integer numRentedRooms
) {
    public static ReservationResponseDto from(Reservation reservation) {
        return new ReservationResponseDto(
                reservation.getId(),
                reservation.getAccommodation().getId(),
                reservation.getAccommodation().getName(),
                reservation.getNumRentedRooms()
        );
    }
}