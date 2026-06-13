package mk.ukim.finki.wp.lab_emt.service;

import mk.ukim.finki.wp.lab_emt.model.domain.ActivityLog;
import org.springframework.data.domain.Page;

public interface ActivityLogService {
    ActivityLog save(String accommodationName,String eventType);
    Page<ActivityLog> findAll(int page, int size);
}
