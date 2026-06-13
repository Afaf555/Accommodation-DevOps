package mk.ukim.finki.wp.lab_emt.service.impl;

import mk.ukim.finki.wp.lab_emt.model.views.AccommodationView;
import mk.ukim.finki.wp.lab_emt.repository.AccommodationViewRepository;
import mk.ukim.finki.wp.lab_emt.service.AccommodationViewService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AccommodationViewServiceImpl implements AccommodationViewService {
    private final AccommodationViewRepository accommodationViewRepository;

    public AccommodationViewServiceImpl(AccommodationViewRepository accommodationViewRepository) {
        this.accommodationViewRepository = accommodationViewRepository;
    }

    @Override
    public List<AccommodationView> findAll() {
        return accommodationViewRepository.findAll();
    }
}
