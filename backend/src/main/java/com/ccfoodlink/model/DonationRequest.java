package com.ccfoodlink.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "donation_requests")
public class DonationRequest {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "item_name", nullable = false)
    private String itemName;

    @Column(nullable = false)
    private String quantity;

    @Column
    private String urgency;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String status;
    
    @ManyToOne
    @JoinColumn(name = "donatee_id", nullable = false)
    private User donatee;
    
    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Default constructor
    public DonationRequest() {
    }

    // Constructor with fields
    public DonationRequest(String itemName, String quantity, String urgency, String description) {
        this.itemName = itemName;
        this.quantity = quantity;
        this.urgency = urgency;
        this.description = description;
        this.status = "PENDING";
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

    public String getStatus() {
        return status;
    }

    public User getDonatee() {
        return donatee;
    }

    public LocalDateTime getCreatedAt() {
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

    public void setStatus(String status) {
        this.status = status;
    }

    public void setDonatee(User donatee) {
        this.donatee = donatee;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
