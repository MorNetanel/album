package com.example.album_project.controllers;

import com.example.album_project.beans.Photo;
import com.example.album_project.beans.Photographer;
import com.example.album_project.enums.PhotoType;
import com.example.album_project.exceptions.PhotographerException;
import com.example.album_project.service.PhotographerService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/photographer")
public class PhotographerController {

    private PhotographerService photographerService;

    @GetMapping("/details")
    public Optional<Photographer> getDetails() throws PhotographerException {
        return Optional.of(photographerService.getDetails());
    }

    @GetMapping
    public List<Photo> getAllPhotos(){
        return photographerService.getAllPhotographerPhotos();
    }

    @PostMapping
    public Optional<Photo> addPhoto(@RequestBody Photo photo) throws PhotographerException {
        return Optional.of(photographerService.addPhoto(photo));
    }

    @GetMapping("/{id}")
    public Optional<Photo> getOnePhoto(@PathVariable int id) throws PhotographerException {
        return Optional.of(photographerService.getPhoto(id));
    }

    @DeleteMapping("/{id}")
    public boolean deletePhoto (@PathVariable int id) throws PhotographerException {
        return photographerService.deletePhoto(id);
    }

    @PutMapping
    public Optional<Photo> updatePhoto(@RequestBody Photo photo) throws PhotographerException {
        return photographerService.updatePhoto(photo);
    }

    @GetMapping("/dates")
    public List<Photo> getAllPhotographerPhotosByDates(@RequestBody LocalDate startDate, @RequestBody LocalDate endDate){
        return photographerService.getPhotosBetweenDates(startDate, endDate);
    }

    @GetMapping("/location")
    public List<Photo> getAllPhotographerByLocation(@RequestParam String location){
        return photographerService.getPhotosByLocation(location);
    }

    @GetMapping("/type")
    public List<Photo> getAllPhotographerPhotosByType(@RequestParam PhotoType photoType){
        return photographerService.getPhotosByPhotoType(photoType);
    }


    @GetMapping("name")
    public Optional<Photo> getPhotographerPhotoByName(@RequestParam String name) throws PhotographerException {
        return Optional.of(photographerService.getPhotoByName(name));
    }




}
