package mk.ukim.finki.wp.lab_emt.model.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "reservations")
public class Reservation extends BaseAuditableEntity {

    @ManyToOne
    @JoinColumn(name = "accommodation_id")
    private Accommodation accommodation;

    private Integer numRentedRooms;

    public Reservation(Accommodation accommodation, Integer numRentedRooms) {
        this.accommodation = accommodation;
        this.numRentedRooms = numRentedRooms;
    }
}