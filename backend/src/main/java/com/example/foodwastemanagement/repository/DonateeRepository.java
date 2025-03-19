package com.example.foodwastemanagement.repository;

import com.example.foodwastemanagement.model.Donatee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DonateeRepository extends JpaRepository<Donatee, Long> {
    Optional<Donatee> findByEmail(String email);
    boolean existsByEmail(String email);
}
