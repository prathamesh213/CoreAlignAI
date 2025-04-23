package com.example.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.Entity.User;
import com.example.backend.Repository.UserRepository;

@Service
public class UserService {
 @Autowired
public   
 UserRepository userRepository;   
    

    public boolean  addUser(User user) {
        userRepository.save(user);
        return true;
    }

    

}
