package mk.ukim.finki.wp.lab_emt.model.projection;

public interface HostStats {
    Long getHostId();
    String getHostName();
    String getHostSurname();
    Long getTotalAccommodations();
    Long getGoodAccommodations();
    Long getBadAccommodations();
    Long getTotalRooms();
    Long getRentedRooms();
}