package com.example.foodwastemanagement.model;

import jakarta.persistence.*;

@Entity
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String donorName;
    private String contactDetails;
    private String foodCategory; // Stores selected checkboxes as a comma-separated string
    private String deliveryOption;
    private String physicalAddress;
    private String description;

    // Default constructor
    public Donation() {}

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
        return id;
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

    // Setters
    public void setId(Long id) {
        this.id = id;
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
}
