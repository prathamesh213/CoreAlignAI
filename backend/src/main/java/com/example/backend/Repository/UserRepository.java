package com.example.backend.Repository;


import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.backend.Entity.User;


public interface UserRepository extends MongoRepository<User, ObjectId>{
   User findByEmail(String email);
}