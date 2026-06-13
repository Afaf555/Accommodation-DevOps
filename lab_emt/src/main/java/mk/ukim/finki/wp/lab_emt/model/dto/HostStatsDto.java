package mk.ukim.finki.wp.lab_emt.model.dto;

public record HostStatsDto(
      Long hostId,
//        String hostName,
//        String hostSurname,
        Long totalAccommodations,
        ConditionsDto conditions,
       // Long totalRooms,
        Long rentedRooms
) {
    public record ConditionsDto(
            Long good,
            Long bad
    ) {}
}