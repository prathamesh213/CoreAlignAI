package com.example.backend.Entity;

import java.util.HashMap;
import java.util.Map;

import lombok.Data;

@Data
public class Results {
    Map<String, Object> assesmentOne = new HashMap<>();
    Map<String, Object> assesmentTwo = new HashMap<>();
    Map<String, Object> assesmentThree = new HashMap<>();
    Map<String, Object> assesmentfour = new HashMap<>();    
}