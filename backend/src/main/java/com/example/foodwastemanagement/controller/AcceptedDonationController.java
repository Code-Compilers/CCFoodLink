package com.example.foodwastemanagement.controller;

import com.example.foodwastemanagement.model.AcceptedDonation;
import com.example.foodwastemanagement.model.Donation;
import com.example.foodwastemanagement.model.Donatee;
import com.example.foodwastemanagement.repository.AcceptedDonationRepository;
import com.example.foodwastemanagement.repository.DonationRepository;
import com.example.foodwastemanagement.repository.DonateeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/accepted-donations")
@CrossOrigin(origins = "http://localhost:3000")
public class AcceptedDonationController {

    private final AcceptedDonationRepository acceptedDonationRepository;
    private final DonationRepository donationRepository;
    private final DonateeRepository donateeRepository;

    @Autowired
    public AcceptedDonationController(
            AcceptedDonationRepository acceptedDonationRepository,
            DonationRepository donationRepository,
            DonateeRepository donateeRepository) {
        this.acceptedDonationRepository = acceptedDonationRepository;
        this.donationRepository = donationRepository;
        this.donateeRepository = donateeRepository;
    }

    // Accept a donation
    @PostMapping("/accept")
    public ResponseEntity<AcceptedDonation> acceptDonation(@RequestParam Long donationId, @RequestParam Long donateeId) {
        Optional<Donation> donationOpt = donationRepository.findById(donationId);
        Optional<Donatee> donateeOpt = donateeRepository.findById(donateeId);

        if (donationOpt.isPresent() && donateeOpt.isPresent()) {
            Donation donation = donationOpt.get();
            Donatee donatee = donateeOpt.get();

            // Check if donation is available
            if (!"available".equals(donation.getStatus())) {
                return ResponseEntity.badRequest().build();
            }

            // Update donation status
            donation.setStatus("accepted");
            donationRepository.save(donation);

            // Create accepted donation record
            AcceptedDonation acceptedDonation = new AcceptedDonation(donation, donatee);
            AcceptedDonation savedAcceptedDonation = acceptedDonationRepository.save(acceptedDonation);

            return ResponseEntity.ok(savedAcceptedDonation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Get accepted donations by donatee
    @GetMapping("/donatee/{donateeId}")
    public ResponseEntity<List<AcceptedDonation>> getAcceptedDonationsByDonatee(@PathVariable Long donateeId) {
        return donateeRepository.findById(donateeId).map(donatee -> {
            List<AcceptedDonation> acceptedDonations = acceptedDonationRepository.findByDonateeOrderByAcceptedDateDesc(donatee);
            return ResponseEntity.ok(acceptedDonations);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update accepted donation status (e.g., mark as completed)
    @PutMapping("/{id}/status")
    public ResponseEntity<AcceptedDonation> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return acceptedDonationRepository.findById(id).map(acceptedDonation -> {
            acceptedDonation.setStatus(status);
            
            // Also update the donation status
            Donation donation = acceptedDonation.getDonation();
            donation.setStatus(status);
            donationRepository.save(donation);
            
            AcceptedDonation updatedAcceptedDonation = acceptedDonationRepository.save(acceptedDonation);
            return ResponseEntity.ok(updatedAcceptedDonation);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}