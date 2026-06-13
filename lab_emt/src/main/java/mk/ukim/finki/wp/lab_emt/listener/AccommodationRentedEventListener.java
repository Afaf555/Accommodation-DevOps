package mk.ukim.finki.wp.lab_emt.listener;

import lombok.extern.slf4j.Slf4j;
import mk.ukim.finki.wp.lab_emt.events.AccommodationRentedEvent;
import mk.ukim.finki.wp.lab_emt.service.ActivityLogService;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@Slf4j
public class AccommodationRentedEventListener {
    private final ActivityLogService activityLogService;

    public AccommodationRentedEventListener(ActivityLogService activityLogService) {
        this.activityLogService = activityLogService;
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Async
    public void onAccommodationRented(AccommodationRentedEvent event) {
        log.info("Accommodation rented: [id={}, name='{}', category={}]",
                event.accommodation().getId(),
                event.accommodation().getName(),
                event.accommodation().getCategory());

        if (event.accommodation().getNumRooms() == 0) {
            log.warn("Accommodation [id={}, name='{}'] is FULLY OCCUPIED - no available rooms!",
                    event.accommodation().getId(),
                    event.accommodation().getName());
            activityLogService.save(
                    event.accommodation().getName(),
                    "ACCOMMODATION_FULLY_OCCUPIED"
            );
        }
    }
}