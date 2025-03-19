package com.example.foodwastemanagement.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class DonationRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String itemName;
    private String quantity;
    private String urgency; // low, medium, high
    private String description;
    
    @ManyToOne
    @JoinColumn(name = "donatee_id")
    private Donatee donatee;
    
    private String status = "pending"; // pending, fulfilled, cancelled
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();

    // Default constructor
    public DonationRequest() {}

    // Parameterized constructor
    public DonationRequest(String itemName, String quantity, String urgency, String description, Donatee donatee) {
        this.itemName = itemName;
        this.quantity = quantity;
        this.urgency = urgency;
        this.description = description;
        this.donatee = donatee;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getItemName() {
        return itemName;
    }

    public String getQuantity() {
        return quantity;
    }

    public String getUrgency() {
        return urgency;
    }

    public String getDescription() {
        return description;
    }

    public Donatee getDonatee() {
        return donatee;
    }

    public String getStatus() {
        return status;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public void setUrgency(String urgency) {
        this.urgency = urgency;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDonatee(Donatee donatee) {
        this.donatee = donatee;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
