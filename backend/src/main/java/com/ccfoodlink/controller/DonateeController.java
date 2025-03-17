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
@RequestMapping("/api/donatee")
@PreAuthorize("hasRole('DONATEE')")
public class DonateeController {
    
    @Autowired
    private DonationRepository donationRepository;
    
    @Autowired
    private DonationRequestRepository donationRequestRepository;
    
    @Autowired
    private UserRepository userRepository;

    // Get donatee profile
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        UserDetailsImpl userDetails = getCurrentUser();
        User user = userRepository.findById(userDetails.getId())
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", userDetails.getId()));
        return ResponseEntity.ok(user);
    }

    // Get all donation requests made by the donatee
    @GetMapping("/requests")
    public List<DonationRequest> getRequests() {
        UserDetailsImpl userDetails = getCurrentUser();
        return donationRequestRepository.findByDonateeIdOrderByCreatedAtDesc(userDetails.getId());
    }
    
    // Get all donations received by the donatee
    @GetMapping("/donations")
    public List<Donation> getDonations() {
        UserDetailsImpl userDetails = getCurrentUser();
        return donationRepository.findByDonateeIdOrderByCreatedAtDesc(userDetails.getId());
    }
    
    // Get available donations
    @GetMapping("/available-donations")
    public List<Donation> getAvailableDonations() {
        return donationRepository.findByStatusOrderByCreatedAtDesc("AVAILABLE");
    }
    
    // Create a new donation request
    @PostMapping("/request")
    public ResponseEntity<?> createRequest(@Valid @RequestBody DonationRequest request) {
        UserDetailsImpl userDetails = getCurrentUser();
        User donatee = userRepository.findById(userDetails.getId())
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", userDetails.getId()));
        
        request.setDonatee(donatee);
        request.setStatus("PENDING");
        
        DonationRequest savedRequest = donationRequestRepository.save(request);
        return ResponseEntity.ok(savedRequest);
    }
    
    // Accept an available donation
    @PostMapping("/accept-donation/{donationId}")
    public ResponseEntity<?> acceptDonation(@PathVariable Long donationId) {
        UserDetailsImpl userDetails = getCurrentUser();
        User donatee = userRepository.findById(userDetails.getId())
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", userDetails.getId()));
            
        Donation donation = donationRepository.findById(donationId)
            .orElseThrow(() -> new ResourceNotFoundException("Donation", "id", donationId));
            
        if (!donation.getStatus().equals("AVAILABLE")) {
            return ResponseEntity.badRequest().body("This donation is no longer available");
        }
        
        donation.setDonatee(donatee);
        donation.setStatus("ACCEPTED");
        
        Donation savedDonation = donationRepository.save(donation);
        return ResponseEntity.ok(savedDonation);
    }
    
    private UserDetailsImpl getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (UserDetailsImpl) authentication.getPrincipal();
    }
}