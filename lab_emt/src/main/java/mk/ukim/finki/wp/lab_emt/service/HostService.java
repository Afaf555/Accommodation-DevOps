package mk.ukim.finki.wp.lab_emt.service;

import mk.ukim.finki.wp.lab_emt.model.dto.HostStatsDto;

public interface HostService {
    HostStatsDto getHostStats(Long hostId);
}