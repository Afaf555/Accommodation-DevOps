package mk.ukim.finki.wp.lab_emt.model.views;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import org.hibernate.annotations.Immutable;

import java.math.BigDecimal;

@Entity
@Getter
@Immutable
@Table(name = "accommodation_stats_view")
public class AccommodationStatsView {

    @Id
    private String category;

    private Long totalAccommodations;

    private Long totalRooms;

    @Column(columnDefinition = "numeric")
    private BigDecimal avgRoomsPerAccommodation;
}