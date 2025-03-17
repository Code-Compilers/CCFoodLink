package com.ccfoodlink.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

import com.ccfoodlink.model.Donation;
import com.ccfoodlink.model.DonationRequest;
import com.ccfoodlink.model.User;
import com.ccfoodlink.repository.DonationRepository;
import com.ccfoodlink.repository.DonationRequestRepository;
import com.ccfoodlink.repository.UserRepository;
import com.ccfoodlink.security.services.UserDetailsImpl;
import com.ccfoodlink.exception.ResourceNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/donator")
@PreAuthorize("hasRole('DONATOR')")
public class DonatorController {
    
    @Autowired
    private DonationRepository donationRepository;
    
    @Autowired
    private DonationRequestRepository donationRequestRepository;
    
    @Autowired
    private UserRepository userRepository;

    // Get donator profile
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        UserDetailsImpl userDetails = getCurrentUser();
        User user = userRepository.findById(userDetails.getId())
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", userDetails.getId()));
        return ResponseEntity.ok(user);
    }

    // Get all donations made by the donator
    @GetMapping("/donations")
    public List<Donation> getDonations() {
        UserDetailsImpl userDetails = getCurrentUser();
        return donationRepository.findByDonatorIdOrderByCreatedAtDesc(userDetails.getId());
    }
    
    // Get all pending donation requests
    @GetMapping("/requests")
    public List<DonationRequest> getRequests() {
        return donationRequestRepository.findByStatusOrderByCreatedAtDesc("PENDING");
    }
    
    // Create a new donation
    @PostMapping("/donate")
    public ResponseEntity<?> createDonation(@Valid @RequestBody Donation donation) {
        UserDetailsImpl userDetails = getCurrentUser();
        User donator = userRepository.findById(userDetails.getId())
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", userDetails.getId()));
        
        donation.setDonator(donator);
        donation.setStatus("AVAILABLE");
        
        Donation savedDonation = donationRepository.save(donation);
        return ResponseEntity.ok(savedDonation);
    }
    
    // Accept a donation request
    @PostMapping("/accept-request/{requestId}")
    public ResponseEntity<?> acceptRequest(@PathVariable Long requestId) {
        UserDetailsImpl userDetails = getCurrentUser();
        User donator = userRepository.findById(userDetails.getId())
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", userDetails.getId()));
            
        DonationRequest request = donationRequestRepository.findById(requestId)
            .orElseThrow(() -> new ResourceNotFoundException("Request", "id", requestId));
            
        if (!request.getStatus().equals("PENDING")) {
            return ResponseEntity.badRequest().body("This request is no longer pending");
        }
        
        // Create a donation based on the request
        Donation donation = new Donation();
        donation.setItemName(request.getItemName());
        donation.setDescription(request.getDescription());
        donation.setDonator(donator);
        donation.setDonatee(request.getDonatee());
        donation.setStatus("ACCEPTED");
        donation.setDeliveryMethod("DELIVERY"); // Default, can be changed
        
        // Update the request status
        request.setStatus("ACCEPTED");
        donationRequestRepository.save(request);
        
        // Save the new donation
        Donation savedDonation = donationRepository.save(donation);
        return ResponseEntity.ok(savedDonation);
    }
    
    private UserDetailsImpl getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (UserDetailsImpl) authentication.getPrincipal();
    }
}
