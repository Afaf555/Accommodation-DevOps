package mk.ukim.finki.wp.lab_emt.web;

import jakarta.validation.Valid;
import mk.ukim.finki.wp.lab_emt.model.dto.ReservationRequestDto;
import mk.ukim.finki.wp.lab_emt.model.dto.ReservationResponseDto;
import mk.ukim.finki.wp.lab_emt.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping
    public ResponseEntity<List<ReservationResponseDto>> findAll() {
        return ResponseEntity.ok(reservationService.findAll());
    }

    @PostMapping("/add")
    public ResponseEntity<ReservationResponseDto> create(
            @RequestBody @Valid ReservationRequestDto dto) {
        return ResponseEntity.ok(reservationService.create(dto));
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        reservationService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}