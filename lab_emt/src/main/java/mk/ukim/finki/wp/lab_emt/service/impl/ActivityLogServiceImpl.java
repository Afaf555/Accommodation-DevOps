package mk.ukim.finki.wp.lab_emt.service.impl;

import jakarta.transaction.Transactional;
import mk.ukim.finki.wp.lab_emt.model.domain.ActivityLog;
import mk.ukim.finki.wp.lab_emt.repository.ActivityLogRepository;
import mk.ukim.finki.wp.lab_emt.service.ActivityLogService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ActivityLogServiceImpl implements ActivityLogService {
    private final ActivityLogRepository activityLogRepository;

    public ActivityLogServiceImpl(ActivityLogRepository activityLogRepository) {
        this.activityLogRepository = activityLogRepository;
    }

    @Override
    @Transactional
    public ActivityLog save(String accommodationName, String eventType) {
       ActivityLog activityLog = new ActivityLog(accommodationName, LocalDateTime.now(),eventType);
       return activityLogRepository.save(activityLog);
    }

    @Override
    public Page<ActivityLog> findAll(int page, int size) {
        return activityLogRepository.findAll(
                PageRequest.of(page, size, Sort.by("eventTime").descending())
        );
    }
}
