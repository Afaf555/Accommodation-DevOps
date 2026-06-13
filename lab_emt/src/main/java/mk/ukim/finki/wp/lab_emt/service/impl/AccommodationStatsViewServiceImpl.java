package mk.ukim.finki.wp.lab_emt.service.impl;

import mk.ukim.finki.wp.lab_emt.model.views.AccommodationStatsView;
import mk.ukim.finki.wp.lab_emt.repository.AccommodationStatsViewRepository;
import mk.ukim.finki.wp.lab_emt.service.AccommodationStatsViewService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AccommodationStatsViewServiceImpl implements AccommodationStatsViewService {
    private final AccommodationStatsViewRepository accommodationStatsViewRepository;

    public AccommodationStatsViewServiceImpl(AccommodationStatsViewRepository accommodationStatsViewRepository) {
        this.accommodationStatsViewRepository = accommodationStatsViewRepository;
    }

    @Override
    public List<AccommodationStatsView> findAll() {
        return accommodationStatsViewRepository.findAll();
    }

    @Override
    public void refresh() {
        accommodationStatsViewRepository.refresh();
    }
}
