package com.example.album_project.service;

import com.example.album_project.beans.Photo;
import com.example.album_project.repository.PhotoRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class GuestService {

    private final PhotoRepository photoRepository;



    public List<Photo> getAllPhotos(){
        log.info("get all photos by guest request");
        return photoRepository.findAll();
    }

}
