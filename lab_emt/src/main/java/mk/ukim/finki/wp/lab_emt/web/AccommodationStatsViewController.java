package mk.ukim.finki.wp.lab_emt.web;

import mk.ukim.finki.wp.lab_emt.model.views.AccommodationStatsView;
import mk.ukim.finki.wp.lab_emt.service.AccommodationStatsViewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/accommodation-stats")
public class AccommodationStatsViewController {

    private final AccommodationStatsViewService accommodationStatsViewService;

    public AccommodationStatsViewController(
            AccommodationStatsViewService accommodationStatsViewService) {
        this.accommodationStatsViewService = accommodationStatsViewService;
    }

    @GetMapping
    public ResponseEntity<List<AccommodationStatsView>> findAll() {
        return ResponseEntity.ok(accommodationStatsViewService.findAll());
    }
}