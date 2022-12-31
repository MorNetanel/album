package com.example.album_project.service;

import com.example.album_project.beans.Client;
import com.example.album_project.beans.Photo;
import com.example.album_project.beans.Photographer;
import com.example.album_project.enums.ErrMsg;
import com.example.album_project.enums.PhotoType;
import com.example.album_project.exceptions.ClientException;
import com.example.album_project.exceptions.PhotographerException;
import com.example.album_project.repository.PhotoRepository;
import com.example.album_project.repository.PhotographerRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class PhotographerService extends AppUserService {

    @Getter
    private int id = -1;

    private final PhotoRepository photoRepository;
    private final PhotographerRepository photographerRepository;

    public Photographer getDetails() throws PhotographerException {
        log.info("get details for photographer id {}", id);
        return photographerRepository.findById(id).orElseThrow(()->
                new PhotographerException(ErrMsg.ID_NOT_FOUND));
    }

    public int login(String email) throws ClientException {
        if(photographerRepository.findIdByEmail(email).isPresent())
            this.id = photographerRepository.findIdByEmail(email).orElseThrow(()-> new ClientException(ErrMsg.EMAIL_NOT_FOUND));
        return id;
    }

    public void register(Photographer photographer) throws PhotographerException {
        if (photographerRepository.existsById(photographer.getId()))
            throw new PhotographerException(ErrMsg.REGISTRATION_FAILURE);
         photographerRepository.save(photographer);
    }

    public Photo addPhoto( Photo photo) throws PhotographerException {
        if (photo.getPrice() <= 0 || photo.getName()==null  )
            throw new PhotographerException(ErrMsg.PHOTO_ACTION_FAILURE);
        List<Photo>photos = photoRepository.findAll();
        if (photos.stream().anyMatch(photo1 -> photo1.getName().equals(photo.getName())))
            throw new PhotographerException(ErrMsg.PHOTO_ACTION_FAILURE);


        photo.setPhotographer(photographerRepository.findById(id)
                .orElseThrow(()->new PhotographerException(ErrMsg.ID_NOT_FOUND)));
        photo.setDateTime(LocalDate.now());
        log.info("add photo {}  by photographer: {} into data base", photo.getName(), photo.getPhotographer().getFirstName()
        + " " + photo.getPhotographer().getLastName());
        return photoRepository.save(photo);
    }

    public Photo getPhoto(int photoId) throws PhotographerException {
        log.info("get photo id : {}" , photoId);
        return photoRepository.getPhotoByIdAndPhotographerId(photoId, id).orElseThrow(()-> new PhotographerException(ErrMsg.PHOTO_ACTION_FAILURE));
    }

    public boolean deletePhoto(int photoId) throws PhotographerException {
         if (photoRepository.deletePhotoByIdAndPhotographerId(photoId, id) >0)
         {log.info("delete photo id : {}" , photoId);
         return true;}
         else {
             log.error("failed to delete");
             throw new    PhotographerException(ErrMsg.PHOTO_ACTION_FAILURE);
         }

    }

    public Optional<Photo> updatePhoto(Photo photo) throws PhotographerException {
        Photo photoBeforeUpdate = photoRepository.getPhotoByIdAndPhotographerId(photo.getId(), id).orElseThrow(() ->
                new PhotographerException(ErrMsg.ID_NOT_FOUND));

        if (photo.getName().equals(photoBeforeUpdate.getName())
            &&
                photo.getId() == photoBeforeUpdate.getId() &&
                        photo.getPrice() > 0 &&
                        photo.getDateTime().getYear()==photoBeforeUpdate.getDateTime().getYear()
                        &&
                        photo.getDateTime().getMonth()== photoBeforeUpdate.getDateTime().getMonth()
                        &&
                        photo.getDateTime().getDayOfMonth()==photoBeforeUpdate.getDateTime().getDayOfMonth()
        ) {
            log.info("update {} photo by photographer : {}", photo.getName(), photo.getPhotographer().getFirstName());
            return Optional.of(photoRepository.save(photo));
        } else {
            log.error("failed to update");
            throw new PhotographerException(ErrMsg.PHOTO_ACTION_FAILURE);
        }
    }

    public List<Photo> getAllPhotographerPhotos(){
        log.info("get all photos");
        return photoRepository.getPhotosByPhotographerId(id);
    }

    public List<Photo> getPhotosBetweenDates(LocalDate startDate, LocalDate endDate){
        log.info("get all photos between {} to {}", startDate, endDate);
        return photoRepository.getPhotosBetweenDates(startDate, endDate).stream()
                .filter(photo -> photo.getPhotographer().getId() == id).collect(Collectors.toList());
    }

    public List<Photo> getPhotosByLocation(String location){
        log.info("get all photos shot in  {}", location);
        return photoRepository.getPhotosByLocation(location).stream()
                .filter(photo -> photo.getPhotographer().getId() == id).collect(Collectors.toList());
    }

    public List<Photo> getPhotosByPhotoType(PhotoType photoType){
        log.info("get all photos by type {}", photoType);
        return photoRepository.getPhotosByPhotoType(photoType).stream()
                .filter(photo -> photo.getPhotographer().getId() == id).collect(Collectors.toList());
    }

    public Photo getPhotoByName(String name) throws PhotographerException {
        log.info("get photo by name {}" , name);
        return photoRepository.getPhotoByName(name).filter(photo -> photo.getPhotographer().getId() == id).orElseThrow(
                ()-> new PhotographerException(ErrMsg.PHOTO_ACTION_FAILURE)
        );
    }







}

