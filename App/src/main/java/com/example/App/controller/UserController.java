package com.example.App.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.App.models.User;
import com.example.App.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin(value  = "http://localhost:3000/")

@RestController
@RequestMapping("/api/v1/")
public class UserController {


    
    public final UserService userService;
    public UserController(UserService  userService) { 
        this.userService = userService;
    }
    @PostMapping("/user")
    public User saveUser(@RequestBody User user){
            
            return userService.saveUser(user);
    }
    @GetMapping("/users")
    public List<User> getAllUsers() {
        
        return userService.getAllUsers();
    }
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id){
        User user = null;
        user = userService.getUserById(id);
        
        return  ResponseEntity.ok(user);

    }
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteEmployees(@PathVariable("id") Long id){
        boolean deleted = false;
        deleted =userService.deleteUser(id);
        Map<String, Boolean> response=   new HashMap<>();
        response.put("deleted",deleted);
        return ResponseEntity.ok(response);

    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        user = userService.updateUser(id,user);
        return  ResponseEntity.ok(user);

    }

    
}
