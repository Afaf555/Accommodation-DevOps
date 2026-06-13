package mk.ukim.finki.wp.lab_emt.service;

import mk.ukim.finki.wp.lab_emt.model.views.AccommodationView;
import org.springframework.stereotype.Service;

import java.util.List;
public interface AccommodationViewService {
    List<AccommodationView> findAll();
}