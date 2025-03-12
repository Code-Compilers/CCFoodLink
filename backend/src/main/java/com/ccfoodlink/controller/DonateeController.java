package com.ccfoodlink.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

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

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@CurrentUser UserPrincipal currentUser) {
        User user = userRepository.findById(currentUser.getId())
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUser.getId()));
        return ResponseEntity.ok(user);
    }

    @GetMapping("/donations")
    public List<DonationRequest> getDonations(@CurrentUser UserPrincipal currentUser) {
        return donationRequestRepository.findByDonateeIdOrderByCreatedAtDesc(currentUser.getId());
    }

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
}
