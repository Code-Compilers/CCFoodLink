package com.example.foodwastemanagement.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Donation_Logs")
public class DonationLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "donation_id")
    private Donation donation;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String comment;

    @Column(name = "log_date", updatable = false)
    private LocalDateTime logDate = LocalDateTime.now();

    public enum Status {
        PENDING, ACCEPTED, REJECTED, DELIVERED
    }

    // Getters and Setters
<<<<<<< HEAD
    public Long getId() {
        return id;
=======
    public Long getLogId() {
        return logId;
>>>>>>> 01146cd8acf8a702ae68ab5e383d89dfb8d1eb5e
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Donation getDonation() {
        return donation;
    }

    public void setDonation(Donation donation) {
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
