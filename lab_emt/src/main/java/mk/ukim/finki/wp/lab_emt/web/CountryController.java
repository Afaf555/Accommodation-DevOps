package mk.ukim.finki.wp.lab_emt.web;

import mk.ukim.finki.wp.lab_emt.model.domain.Country;
import mk.ukim.finki.wp.lab_emt.repository.CountryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/countries")
public class CountryController {

    private final CountryRepository countryRepository;

    public CountryController(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @GetMapping
    public ResponseEntity<List<Country>> findAll() {
        return ResponseEntity.ok(countryRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Country> findById(@PathVariable Long id) {
        return countryRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Country> create(@RequestBody CountryCreateRequest request) {
        Country country = new Country();
        country.setName(request.getName());
        country.setContinent(request.getContinent());
        return ResponseEntity.ok(countryRepository.save(country));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Country> update(@PathVariable Long id, @RequestBody CountryCreateRequest request) {
        return countryRepository.findById(id)
                .map(country -> {
                    country.setName(request.getName());
                    country.setContinent(request.getContinent());
                    return ResponseEntity.ok(countryRepository.save(country));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        countryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    public static class CountryCreateRequest {
        private String name;
        private String continent;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getContinent() { return continent; }
        public void setContinent(String continent) { this.continent = continent; }
    }
}