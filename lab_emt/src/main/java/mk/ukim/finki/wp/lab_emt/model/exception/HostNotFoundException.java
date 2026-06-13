package mk.ukim.finki.wp.lab_emt.model.exception;

public class HostNotFoundException extends RuntimeException {
    public HostNotFoundException(Long id) {
        super("Host with id " + id + " not found");
    }
}