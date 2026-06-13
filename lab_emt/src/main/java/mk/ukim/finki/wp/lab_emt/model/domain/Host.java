package mk.ukim.finki.wp.lab_emt.model.domain;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

@Table(name="hosts")
public class Host  extends BaseAuditableEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @CreationTimestamp
    public LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    private String name;
    private String surname;
    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;
    public Host(String name, String surname, Country country) {
        this.name = name;
        this.surname = surname;
        this.country = country;
    }
}
