package com.example.foodwastemanagement.model;

import jakarta.persistence.*;
<<<<<<< HEAD
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
=======
<<<<<<< HEAD
=======
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
>>>>>>> Bokang
>>>>>>> 01146cd8acf8a702ae68ab5e383d89dfb8d1eb5e

@Entity
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long donationId;

    private String donorName;
    private String contactDetails;
    private String foodCategory; // Stores selected checkboxes as a comma-separated string
    private String deliveryOption;
    private String physicalAddress;
    private String description;
    private String status = "available"; // available, accepted, completed

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();
    
    @OneToMany(mappedBy = "donation", cascade = CascadeType.ALL)
    private List<DonationLog> logs = new ArrayList<>();
    
    @OneToMany(mappedBy = "donation", cascade = CascadeType.ALL)
    private List<AcceptedDonation> acceptedDonations = new ArrayList<>();

    // Default constructor
    public Donation() {}

<<<<<<< HEAD
    // Parameterized constructor
    public Donation(String donorName, String contactDetails, String foodCategory, String deliveryOption, String physicalAddress, String description) {
        this.donorName = donorName;
        this.contactDetails = contactDetails;
        this.foodCategory = foodCategory;
        this.deliveryOption = deliveryOption;
        this.physicalAddress = physicalAddress;
        this.description = description;
    }

    // Getters
    public Long getId() {
=======
    // Getters and Setters
    public Long getDonationId() {
>>>>>>> Bokang
        return donationId;
    }

    public String getDonorName() {
        return donorName;
    }

    public String getContactDetails() {
        return contactDetails;
    }

    public String getFoodCategory() {
        return foodCategory;
    }

    public String getDeliveryOption() {
        return deliveryOption;
    }

    public String getPhysicalAddress() {
        return physicalAddress;
    }

    public String getDescription() {
        return description;
    }

    public String getStatus() {
        return status;
    }

    public Date getCreatedAt() {
        return createdAt;
    }
    
    public List<DonationLog> getLogs() {
        return logs;
    }
    
    public List<AcceptedDonation> getAcceptedDonations() {
        return acceptedDonations;
    }

    // Setters
    public void setId(Long id) {
        this.donationId = id;
    }

    public void setDonorName(String donorName) {
        this.donorName = donorName;
    }

    public void setContactDetails(String contactDetails) {
        this.contactDetails = contactDetails;
    }

    public void setFoodCategory(String foodCategory) {
        this.foodCategory = foodCategory;
    }

    public void setDeliveryOption(String deliveryOption) {
        this.deliveryOption = deliveryOption;
    }

    public void setPhysicalAddress(String physicalAddress) {
        this.physicalAddress = physicalAddress;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
    
    public void setLogs(List<DonationLog> logs) {
        this.logs = logs;
    }
    
    public void setAcceptedDonations(List<AcceptedDonation> acceptedDonations) {
        this.acceptedDonations = acceptedDonations;
    }
}
