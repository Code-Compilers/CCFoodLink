package com.ccfoodlink.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

import com.ccfoodlink.model.DonationRequest;
import com.ccfoodlink.model.User;
import com.ccfoodlink.repository.DonationRequestRepository;
import com.ccfoodlink.repository.UserRepository;
import com.ccfoodlink.security.CurrentUser;
import com.ccfoodlink.security.UserPrincipal;
import com.ccfoodlink.exception.ResourceNotFoundException;

@RestController
@RequestMapping("/api/donatee")
public class DonateeController {
    
    @Autowired
    private DonationRequestRepository donationRequestRepository;
    
    @Autowired
    private UserRepository userRepository;

    // Get donatee profile
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@CurrentUser UserPrincipal currentUser) {
        User user = userRepository.findById(currentUser.getId())
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUser.getId()));
        return ResponseEntity.ok(user);
    }

    // Get all donation requests made by the donatee
    @GetMapping("/donations")
    public List<DonationRequest> getDonations(@CurrentUser UserPrincipal currentUser) {
        return donationRequestRepository.findByDonateeIdOrderByCreatedAtDesc(currentUser.getId());
    }
    
    // Get accepted donations for the donatee
    @GetMapping("/donations/accepted")
    public List<DonationRequest> getAcceptedDonations(@CurrentUser UserPrincipal currentUser) {
        return donationRequestRepository.findByDonateeIdAndStatusOrderByCreatedAtDesc(
            currentUser.getId(), "ACCEPTED");
    }
    
    // Get available donations (that can be requested)
    @GetMapping("/donations/available")
    public List<DonationRequest> getAvailableDonations(@CurrentUser UserPrincipal currentUser) {
        return donationRequestRepository.findAvailableDonations(currentUser.getId());
    }

    // Create a new donation request
    @PostMapping("/request")
    public ResponseEntity<?> createRequest(@CurrentUser UserPrincipal currentUser, 
                                         @Valid @RequestBody DonationRequest request) {
        User donatee = userRepository.findById(currentUser.getId())
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUser.getId()));
        
        request.setDonatee(donatee);
        request.setStatus("PENDING");
        
        DonationRequest savedRequest = donationRequestRepository.save(request);
        return ResponseEntity.ok(savedRequest);
    }
    
    // Accept an available donation
    @PostMapping("/accept/{requestId}")
    public ResponseEntity<?> acceptDonation(@CurrentUser UserPrincipal currentUser,
                                          @PathVariable Long requestId) {
        User donatee = userRepository.findById(currentUser.getId())
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUser.getId()));
            
        DonationRequest donation = donationRequestRepository.findById(requestId)
            .orElseThrow(() -> new ResourceNotFoundException("Donation", "id", requestId));
            
        if (!donation.getStatus().equals("AVAILABLE")) {
            return ResponseEntity.badRequest().body(Map.of("message", "This donation is not available"));
        }
        
        donation.setDonatee(donatee);
        donation.setStatus("ACCEPTED");
        
        DonationRequest savedDonation = donationRequestRepository.save(donation);
        return ResponseEntity.ok(savedDonation);
    }
}
