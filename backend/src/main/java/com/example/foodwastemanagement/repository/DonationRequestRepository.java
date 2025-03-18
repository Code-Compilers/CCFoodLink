package com.example.foodwastemanagement.repository;

import com.example.foodwastemanagement.model.DonationRequest;
import com.example.foodwastemanagement.model.Donatee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationRequestRepository extends JpaRepository<DonationRequest, Long> {
    List<DonationRequest> findByDonateeOrderByCreatedAtDesc(Donatee donatee);
}
