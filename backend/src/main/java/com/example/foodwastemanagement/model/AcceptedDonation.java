package com.example.foodwastemanagement.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class AcceptedDonation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "donation_id")
    private Donation donation;

    @ManyToOne
    @JoinColumn(name = "donatee_id")
    private Donatee donatee;

    private String status = "accepted"; // accepted, completed
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date acceptedDate = new Date();

    // Default constructor
    public AcceptedDonation() {}

    // Parameterized constructor
    public AcceptedDonation(Donation donation, Donatee donatee) {
        this.donation = donation;
        this.donatee = donatee;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public Donation getDonation() {
        return donation;
    }

    public Donatee getDonatee() {
        return donatee;
    }

    public String getStatus() {
        return status;
    }

    public Date getAcceptedDate() {
        return acceptedDate;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setDonation(Donation donation) {
        this.donation = donation;
    }

    public void setDonatee(Donatee donatee) {
        this.donatee = donatee;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setAcceptedDate(Date acceptedDate) {
        this.acceptedDate = acceptedDate;
    }
}
