package com.example.foodwastemanagement.controller;

import com.example.foodwastemanagement.model.Donatee;
import com.example.foodwastemanagement.model.DonationRequest;
import com.example.foodwastemanagement.repository.DonateeRepository;
import com.example.foodwastemanagement.repository.DonationRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/donatees")
@CrossOrigin(origins = "http://localhost:3000")
public class DonateeController {

    private final DonateeRepository donateeRepository;
    private final DonationRequestRepository donationRequestRepository;

    @Autowired
    public DonateeController(DonateeRepository donateeRepository, DonationRequestRepository donationRequestRepository) {
        this.donateeRepository = donateeRepository;
        this.donationRequestRepository = donationRequestRepository;
    }

    // Register a new donatee
    @PostMapping("/register")
    public ResponseEntity<Donatee> registerDonatee(@RequestBody Donatee donatee) {
        if (donateeRepository.existsByEmail(donatee.getEmail())) {
            return ResponseEntity.badRequest().build();
        }
        
        Donatee savedDonatee = donateeRepository.save(donatee);
        return ResponseEntity.ok(savedDonatee);
    }

    // Get donatee profile
    @GetMapping("/{id}")
    public ResponseEntity<Donatee> getDonateeById(@PathVariable Long id) {
        Optional<Donatee> donatee = donateeRepository.findById(id);
        return donatee.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update donatee profile
    @PutMapping("/{id}")
    public ResponseEntity<Donatee> updateDonatee(@PathVariable Long id, @RequestBody Donatee updatedDonatee) {
        return donateeRepository.findById(id).map(donatee -> {
            donatee.setName(updatedDonatee.getName());
            donatee.setPhone(updatedDonatee.getPhone());
            donatee.setAddress(updatedDonatee.getAddress());
            donatee.setOrganization(updatedDonatee.getOrganization());
            donateeRepository.save(donatee);
            return ResponseEntity.ok(donatee);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create donation request
    @PostMapping("/{id}/requests")
    public ResponseEntity<DonationRequest> createDonationRequest(@PathVariable Long id, @RequestBody DonationRequest request) {
        return donateeRepository.findById(id).map(donatee -> {
            request.setDonatee(donatee);
            DonationRequest savedRequest = donationRequestRepository.save(request);
            return ResponseEntity.ok(savedRequest);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get donation requests by donatee
    @GetMapping("/{id}/requests")
    public ResponseEntity<List<DonationRequest>> getDonationRequests(@PathVariable Long id) {
        return donateeRepository.findById(id).map(donatee -> {
            List<DonationRequest> requests = donationRequestRepository.findByDonateeOrderByCreatedAtDesc(donatee);
            return ResponseEntity.ok(requests);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
