package com.example.foodwastemanagement.repository;

import com.example.foodwastemanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD
import org.springframework.stereotype.Repository;

=======
>>>>>>> 01146cd8acf8a702ae68ab5e383d89dfb8d1eb5e
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
