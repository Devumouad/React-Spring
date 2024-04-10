package com.example.App.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.App.models.User;

@Service
public interface UserService {

    User saveUser(User user);
    List<User> getAllUsers();
    User getUserById(Long id);
    boolean deleteUser(Long id);
    User updateUser(Long id, User user);
}
