package com.example.App.service;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.example.App.entity.UserEntity;
import com.example.App.models.User;
import com.example.App.repository.UserRepository;

import  java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceIml implements UserService  {
   
    private UserRepository userRepo;
    public  UserServiceIml(UserRepository userRepo) { 
        this.userRepo = userRepo;
    }
   
    @Override
    public User saveUser(User user) {
        UserEntity userEntity = new UserEntity();
    BeanUtils.copyProperties(user, userEntity);
    
    userEntity = userRepo.save(userEntity);
    
    user.setId(userEntity.getId());
    
    return user;
    }
    @Override
    public List<User> getAllUsers() {
        List<UserEntity> usersEntities= userRepo.findAll();
        List<User> users =  usersEntities.stream().map(
            UserEntity->new User(
                UserEntity.getId(),
                UserEntity.getFirstName(),
                UserEntity.getLastName(),
                UserEntity.getEmailId()
                )).collect(Collectors.toList()) ;
        return users;
    }
    @Override
    public User getUserById(Long id){
        UserEntity userEntity = userRepo.findById(id).get();
        User user = new User();
        BeanUtils.copyProperties(userEntity, user);
        return user;
    }
    @Override
    public boolean deleteUser(Long id) {
    Optional<UserEntity> userOptional = userRepo.findById(id);
    if (userOptional.isPresent()) {
        UserEntity user = userOptional.get();
        userRepo.delete(user);
        return true;
    } else {
        return false; // User with the given id does not exist
    }
}

    @Override
    public User updateUser(Long id, User user) {
        UserEntity userEntity = userRepo.findById(id).get();
        userEntity.setFirstName(user.getFirstName());
        userEntity.setEmailId(user.getEmailId());
        userEntity.setLastName(user.getLastName());
        userRepo.save(userEntity);
        return user;
    }
}
