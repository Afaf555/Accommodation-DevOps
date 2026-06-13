package mk.ukim.finki.wp.lab_emt.model.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.wp.lab_emt.model.domain.Category;

public record AccommodationRequestDto(
        @NotBlank(message = "Name is required")
        String name,
        @NotNull(message = "Category is required")
        Category category,
        @NotNull(message = "Host is required")
        Long hostId,
        @NotNull(message = "Number of rooms is required")
        @Min(value = 1,message = "Number of rooms must be at least 1")
        Integer numRooms
) {
}
