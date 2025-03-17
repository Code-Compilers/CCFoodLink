package com.ccfoodlink.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.ccfoodlink.model.DonationRequest;

@Repository
public interface DonationRequestRepository extends JpaRepository<DonationRequest, Long> {
    // Get donatee's requests
    List<DonationRequest> findByDonateeIdOrderByCreatedAtDesc(Long donateeId);
    
    // Get accepted donations for a donatee
    List<DonationRequest> findByDonateeIdAndStatusOrderByCreatedAtDesc(Long donateeId, String status);
    
    // Get available donations (those not assigned to the current donatee)
    @Query("SELECT d FROM DonationRequest d WHERE d.status = 'AVAILABLE' AND d.donatee.id != :donateeId")
    List<DonationRequest> findAvailableDonations(Long donateeId);
}