package mk.ukim.finki.wp.lab_emt.web;

import mk.ukim.finki.wp.lab_emt.model.domain.Host;
import mk.ukim.finki.wp.lab_emt.repository.CountryRepository;
import mk.ukim.finki.wp.lab_emt.repository.HostRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hosts")
public class HostController {

    private final HostRepository hostRepository;
    private final CountryRepository countryRepository;

    public HostController(HostRepository hostRepository, CountryRepository countryRepository) {
        this.hostRepository = hostRepository;
        this.countryRepository = countryRepository;
    }

    @GetMapping
    public ResponseEntity<List<Host>> findAll() {
        return ResponseEntity.ok(hostRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Host> findById(@PathVariable Long id) {
        return hostRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Host> create(@RequestBody HostCreateRequest request) {
        Host host = new Host();
        host.setName(request.getName());
        host.setSurname(request.getSurname());
        host.setCountry(countryRepository.findById(request.getCountryId())
                .orElseThrow(() -> new RuntimeException("Country not found")));
        return ResponseEntity.ok(hostRepository.save(host));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Host> update(@PathVariable Long id, @RequestBody HostCreateRequest request) {
        return hostRepository.findById(id)
                .map(host -> {
                    host.setName(request.getName());
                    host.setSurname(request.getSurname());
                    host.setCountry(countryRepository.findById(request.getCountryId())
                            .orElseThrow(() -> new RuntimeException("Country not found")));
                    return ResponseEntity.ok(hostRepository.save(host));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        hostRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    public static class HostCreateRequest {
        private String name;
        private String surname;
        private Long countryId;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getSurname() { return surname; }
        public void setSurname(String surname) { this.surname = surname; }
        public Long getCountryId() { return countryId; }
        public void setCountryId(Long countryId) { this.countryId = countryId; }
    }
}