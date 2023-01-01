package com.example.album_project.controllers;

import com.example.album_project.beans.Client;
import com.example.album_project.beans.Photo;
import com.example.album_project.enums.PhotoType;
import com.example.album_project.exceptions.ClientException;
import com.example.album_project.service.ClientService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/client")
@AllArgsConstructor
public class ClientController {

    private ClientService clientService;

    @GetMapping("/details")
    public Optional<Client> getDetails() throws ClientException {
        return Optional.of(clientService.getDetails());
    }

    @GetMapping("/{id}")
    public Optional<Photo>getOnePhoto(@PathVariable int id) throws ClientException {
        return Optional.of(clientService.getOnePhoto(id));
    }

    @GetMapping
    public List<Photo> getAllPhotos(){
        return clientService.getAllPhotos();
    }

    @GetMapping("/price")
    public List<Photo> getPhotosBetweenPrices(@RequestParam double min, @RequestParam double max){
        return clientService.getPhotosBetweenPrices(min, max);
    }

    @GetMapping("/name")
    public Optional<Photo> getPhotoByName(@RequestParam String name) throws ClientException {
        return Optional.of(clientService.getPhotoByName(name));
    }

    @GetMapping("/type")
    public List<Photo> getPhotosByType(@RequestParam PhotoType photoType){
        return clientService.getPhotosByType(photoType);
    }

    @GetMapping("/dates")
    public List<Photo> getPhotosByDates(@RequestBody LocalDate startDate, @RequestBody LocalDate endDate){
        return clientService.getPhotosByDates(startDate, endDate);
    }

    @GetMapping("/location")
    public List<Photo> getPhotosByLocation(@RequestParam String location){
        return clientService.getPhotosByLocation(location);
    }

    @GetMapping("/photographer")
    public List<Photo> getPhotosByPhotographer(@RequestParam String fName, @RequestParam String lName) throws ClientException {
        return clientService.getPhotosByPhotographer(fName, lName);    }

    @PostMapping
    public Optional<Photo> purchasePhoto(@RequestBody Photo photo) throws ClientException {
        return clientService.purchasePhoto(photo);

    }

    @GetMapping("/purchased")
    public List<Photo> getAllPurchasedPhotos(){
        return clientService.getAllPurchasedPhotos();
    }


}
