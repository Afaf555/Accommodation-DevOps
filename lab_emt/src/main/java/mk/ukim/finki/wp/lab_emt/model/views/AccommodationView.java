package mk.ukim.finki.wp.lab_emt.model.views;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import org.hibernate.annotations.Immutable;

@Entity
@Getter
@Immutable
@Table(name = "accommodation_view")
public class AccommodationView {

    @Id
    private Long id;

    private String accommodationName;

    private String category;

    private Integer numRooms;

    private String hostFullName;

    private String countryName;
}