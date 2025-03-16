package com.example.foodwastemanagement.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Donation_Logs")
public class DonationLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long logId;

    @ManyToOne
    @JoinColumn(name = "donation_id", referencedColumnName = "donationId")
    private com.example.foodwastemanagement.model.Donation donation;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String comment;

    @Column(name = "log_date", updatable = false)
    private LocalDateTime logDate = LocalDateTime.now();

    public enum Status {
        PENDING, ACCEPTED, REJECTED, DELIVERED
    }

    // Getters and Setters
    public Long getLogId() {
        return logId;
    }

    public void setLogId(Long logId) {
        this.logId = logId;
    }

    public com.example.foodwastemanagement.model.Donation getDonation() {
        return donation;
    }

    public void setDonation(com.example.foodwastemanagement.model.Donation donation) {
        this.donation = donation;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDateTime getLogDate() {
        return logDate;
    }

    public void setLogDate(LocalDateTime logDate) {
        this.logDate = logDate;
    }
}
