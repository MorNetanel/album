package com.example.album_project.controllers;

import com.example.album_project.beans.Photo;
import com.example.album_project.service.GuestService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/home")
public class HomeController {


    private final GuestService guestService;


    @GetMapping
    public List<Photo> getAllPhotosToGuest(){
        return guestService.getAllPhotos();
    }
}
