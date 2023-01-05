package com.example.album_project.controllers;

import com.example.album_project.beans.Photo;
import com.example.album_project.service.GuestService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/guest")
@Slf4j
public class GuestController {


    private final GuestService guestService;


    @GetMapping
    public List<Photo> getAllPhotosToGuest(){
      log.info("guest request for all photos");
        return guestService.getAllPhotos();
    }
}
