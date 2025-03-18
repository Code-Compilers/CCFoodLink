package com.example.foodwastemanagement.repository;

import com.example.foodwastemanagement.model.AcceptedDonation;
import com.example.foodwastemanagement.model.Donatee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AcceptedDonationRepository extends JpaRepository<AcceptedDonation, Long> {
    List<AcceptedDonation> findByDonateeOrderByAcceptedDateDesc(Donatee donatee);
}
