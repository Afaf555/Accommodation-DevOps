package mk.ukim.finki.wp.lab_emt.model.exception;

public class AccommodationNotFoundException extends RuntimeException {
    public AccommodationNotFoundException(Long id) {
        super("Accommodation with id " + id + " not found");
    }
}
