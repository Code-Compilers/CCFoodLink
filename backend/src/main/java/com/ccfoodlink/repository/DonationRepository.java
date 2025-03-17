package com.ccfoodlink.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.ccfoodlink.model.Donation;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {
    List<Donation> findByDonatorIdOrderByCreatedAtDesc(Long donatorId);
    List<Donation> findByDonateeIdOrderByCreatedAtDesc(Long donateeId);
    List<Donation> findByStatusOrderByCreatedAtDesc(String status);
}
