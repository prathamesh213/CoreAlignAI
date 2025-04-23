package com.example.backend.Contoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.Entity.Results;
import com.example.backend.Entity.User;
import com.example.backend.Service.UserService;


@RestController
@RequestMapping("/user")
public class UserController {
 @Autowired
 UserService userService;   

 @Autowired
PasswordEncoder passwordEncoder;
 
String email = "";

 @PostMapping("/signUp")   
 public ResponseEntity<User> signUp(@RequestBody User user) {
          // Check if the user already exists
        email = user.getEmail();
        User existingUser = userService.userRepository.findByEmail(user.getEmail());
        if (existingUser != null) {
            return ResponseEntity.badRequest().body(null); // User already exists
        }     
        // Save the new user

        user.setPassword(passwordEncoder.encode(user.getPassword())); 
        userService.addUser(user);
        return ResponseEntity.ok(user);
 }

  @PostMapping("/login")   
  public ResponseEntity<User> login(@RequestBody User user) {
        User existingUser = userService.userRepository.findByEmail(user.getEmail());
        if (existingUser == null) {
            return ResponseEntity.badRequest().body(null); // User not found
        }
        
        return ResponseEntity.ok(user);
  }

  @PostMapping("/assesmentOne")
  public ResponseEntity<Results> assesmentOne(@RequestBody Results result) {
      result.getAssesmentOne().put("key", "value");
      return ResponseEntity.ok(result);
  }


}