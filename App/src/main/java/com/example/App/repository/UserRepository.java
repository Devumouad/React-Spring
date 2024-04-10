package com.example.App.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.App.entity.UserEntity;
@Repository
public interface UserRepository  extends JpaRepository<UserEntity, Long> {
    
}
