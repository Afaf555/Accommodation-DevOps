package mk.ukim.finki.wp.lab_emt.service;

import mk.ukim.finki.wp.lab_emt.model.views.AccommodationStatsView;
import java.util.List;

public interface AccommodationStatsViewService {
    List<AccommodationStatsView> findAll();
    void refresh();
}