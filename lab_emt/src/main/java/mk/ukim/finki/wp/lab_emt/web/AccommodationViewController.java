package mk.ukim.finki.wp.lab_emt.web;

import mk.ukim.finki.wp.lab_emt.model.views.AccommodationView;
import mk.ukim.finki.wp.lab_emt.service.AccommodationViewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/accommodation-view")
public class AccommodationViewController {

    private final AccommodationViewService accommodationViewService;

    public AccommodationViewController(AccommodationViewService accommodationViewService) {
        this.accommodationViewService = accommodationViewService;
    }

    @GetMapping
    public ResponseEntity<List<AccommodationView>> findAll() {
        return ResponseEntity.ok(accommodationViewService.findAll());
    }
}