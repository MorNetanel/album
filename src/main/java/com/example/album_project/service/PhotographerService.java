package com.example.album_project.service;

import com.example.album_project.beans.Photo;
import com.example.album_project.enums.ErrMsg;
import com.example.album_project.exceptions.PhotographerException;
import com.example.album_project.repository.PhotoRepository;
import com.example.album_project.repository.PhotographerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class PhotographerService {

    private int id = 1;

    private final PhotoRepository photoRepository;
    private final PhotographerRepository photographerRepository;

    public Photo addPhoto( Photo photo) throws PhotographerException {
        if (photo.getPrice() <= 0 || photo.getName()==null  )
            throw new PhotographerException(ErrMsg.PHOTO_ACTION_FAILURE);

        photo.setPhotographer(photographerRepository.findById(id)
                .orElseThrow(()->new PhotographerException(ErrMsg.ID_NOT_FOUND)));
        photo.setDateTime(LocalDateTime.now());
        log.info("insert {}  by photographer: {} into data base", photo.getName(), photo.getPhotographer().getFirstName()
        + " " + photo.getPhotographer().getLastName());
        return photoRepository.save(photo);
    }

    public Photo getPhoto(int photoId) throws PhotographerException {
        log.info("get photo id : {}" , photoId);
        return photoRepository.getPhotoByIdAndPhotographerId(photoId, id).orElseThrow(()-> new PhotographerException(ErrMsg.PHOTO_ACTION_FAILURE));
    }

    public void deletePhoto(int photoId) throws PhotographerException {
         if (photoRepository.deletePhotoByIdAndPhotographerId(photoId, id) >0)
             log.info("delete photo id : {}" , photoId);
         else {
             log.error("failed to delete");
             throw new    PhotographerException(ErrMsg.PHOTO_ACTION_FAILURE);
         }

    }

    public Optional<Photo> updatePhoto(Photo photo) throws PhotographerException {
        Photo photoBeforeUpdate = photoRepository.getPhotoByIdAndPhotographerId(photo.getId(), id).orElseThrow(() ->
                new PhotographerException(ErrMsg.ID_NOT_FOUND));

        if (
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
        return photoRepository.getPhotosByPhotographerId(id);
    }



}

