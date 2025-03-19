package com.example.foodwastemanagement.controller;

import com.example.foodwastemanagement.model.Donation;
import com.example.foodwastemanagement.repository.DonationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/donations")
@CrossOrigin(origins = "http://localhost:3000")
public class DonationController {

    private final DonationRepository donationRepository;

    public DonationController(DonationRepository donationRepository) {
        this.donationRepository = donationRepository;
    }

    // Get all donations
    @GetMapping
    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }

    // Get available donations
    @GetMapping("/available")
    public List<Donation> getAvailableDonations() {
        return donationRepository.findAll().stream()
                .filter(donation -> "available".equals(donation.getStatus()))
                .collect(Collectors.toList());
    }

    // Get a donation by ID
    @GetMapping("/{id}")
    public ResponseEntity<Donation> getDonationById(@PathVariable Long id) {
        Optional<Donation> donation = donationRepository.findById(id);
        return donation.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Add a new donation
    @PostMapping("/add")
    public ResponseEntity<Donation> createDonation(@RequestBody Donation donation) {
        donation.setStatus("available");
        Donation savedDonation = donationRepository.save(donation);
        return ResponseEntity.ok(savedDonation);
    }

    // Update an existing donation
    @PutMapping("/{id}")
    public ResponseEntity<Donation> updateDonation(@PathVariable Long id, @RequestBody Donation updatedDonation) {
        return donationRepository.findById(id).map(donation -> {
            donation.setDonorName(updatedDonation.getDonorName());
            donation.setContactDetails(updatedDonation.getContactDetails());
            donation.setFoodCategory(updatedDonation.getFoodCategory());
            donation.setDeliveryOption(updatedDonation.getDeliveryOption());
            donation.setPhysicalAddress(updatedDonation.getPhysicalAddress());
            donation.setDescription(updatedDonation.getDescription());
            
            // Only update status if provided and not null
            if (updatedDonation.getStatus() != null) {
                donation.setStatus(updatedDonation.getStatus());
            }
            
            donationRepository.save(donation);
            return ResponseEntity.ok(donation);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update donation status
    @PutMapping("/{id}/status")
    public ResponseEntity<Donation> updateDonationStatus(@PathVariable Long id, @RequestParam String status) {
        return donationRepository.findById(id).map(donation -> {
            donation.setStatus(status);
            donationRepository.save(donation);
            return ResponseEntity.ok(donation);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete a donation
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDonation(@PathVariable Long id) {
        if (donationRepository.existsById(id)) {
            donationRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}