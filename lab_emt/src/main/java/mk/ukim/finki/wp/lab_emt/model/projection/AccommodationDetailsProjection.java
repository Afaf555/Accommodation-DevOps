package mk.ukim.finki.wp.lab_emt.model.projection;

public interface AccommodationDetailsProjection {
    Long getId();
    String getName();
    String getCategory();
    Integer getNumRooms();
    HostProjection getHost();

    interface HostProjection {
        String getName();
        String getSurname();
        CountryProjection getCountry();

        interface CountryProjection {
            String getName();
        }
    }
}