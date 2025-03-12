package com.ccfoodlink.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.ccfoodlink.model.DonationRequest;

@Repository
public interface DonationRequestRepository extends JpaRepository<DonationRequest, Long> {
    List<DonationRequest> findByDonateeIdOrderByCreatedAtDesc(Long donateeId);
}
