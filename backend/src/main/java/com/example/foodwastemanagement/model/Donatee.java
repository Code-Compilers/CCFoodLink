package com.example.foodwastemanagement.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Donatee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    
    @Column(unique = true)
    private String email;
    
    private String password;
    private String phone;
    private String address;
    private String organization;
    private String role = "donatee";
    
    @OneToMany(mappedBy = "donatee", cascade = CascadeType.ALL)
    private List<DonationRequest> donationRequests = new ArrayList<>();
    
    @OneToMany(mappedBy = "donatee", cascade = CascadeType.ALL)
    private List<AcceptedDonation> acceptedDonations = new ArrayList<>();

    // Default constructor
    public Donatee() {}

    // Parameterized constructor
    public Donatee(String name, String email, String password, String phone, String address, String organization) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.organization = organization;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }

    public String getOrganization() {
        return organization;
    }

    public String getRole() {
        return role;
    }
    
    public List<DonationRequest> getDonationRequests() {
        return donationRequests;
    }
    
    public List<AcceptedDonation> getAcceptedDonations() {
        return acceptedDonations;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public void setRole(String role) {
        this.role = role;
    }
    
    public void setDonationRequests(List<DonationRequest> donationRequests) {
        this.donationRequests = donationRequests;
    }
    
    public void setAcceptedDonations(List<AcceptedDonation> acceptedDonations) {
        this.acceptedDonations = acceptedDonations;
    }
}
