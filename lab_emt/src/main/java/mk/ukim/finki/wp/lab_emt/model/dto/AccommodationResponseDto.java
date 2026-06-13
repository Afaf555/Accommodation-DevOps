package mk.ukim.finki.wp.lab_emt.model.dto;

import mk.ukim.finki.wp.lab_emt.model.domain.Accommodation;
import mk.ukim.finki.wp.lab_emt.model.domain.Category;
import mk.ukim.finki.wp.lab_emt.model.domain.Condition;

public record AccommodationResponseDto(
        Long id,
        String name,
        Category category,
        Condition condition,
        String hostName,
        String hostSurname,
        Integer numRooms,
        boolean isRented
) {
    public static AccommodationResponseDto from(Accommodation accommodation) {
        return new AccommodationResponseDto(
                accommodation.getId(),
                accommodation.getName(),
                accommodation.getCategory(),
                accommodation.getCondition(),
                accommodation.getHost().getName(),
                accommodation.getHost().getSurname(),
                accommodation.getNumRooms(),
                accommodation.isRented()
        );
    }
}
