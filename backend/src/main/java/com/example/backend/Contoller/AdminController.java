package com.example.backend.Contoller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/login")
public class AdminController {

    @GetMapping()
    public String getMethodName() {
        return "WassUp ma Admin Page";
    }
    
    
}
