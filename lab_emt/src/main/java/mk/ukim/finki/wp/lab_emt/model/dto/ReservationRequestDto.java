package mk.ukim.finki.wp.lab_emt.model.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record ReservationRequestDto(
        @NotNull(message = "Accommodation is required")
        Long accommodationId,

        @NotNull(message = "Number of rented rooms is required")
        @Min(value = 1, message = "Number of rented rooms must be at least 1")
        Integer numRentedRooms
) {}