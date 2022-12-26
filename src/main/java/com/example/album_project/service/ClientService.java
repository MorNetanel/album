package com.example.album_project.service;

import com.example.album_project.beans.Photo;
import com.example.album_project.enums.ErrMsg;
import com.example.album_project.exceptions.ClientException;
import com.example.album_project.repository.PhotoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ClientService {


    private int id  = 1;
    private final PhotoRepository photoRepository;

    public Photo getOnePhoto(int photoId) throws ClientException {
        log.info("get photo id: {}" , photoId);
        return photoRepository.findById(photoId).orElseThrow(()-> new ClientException(ErrMsg.ID_NOT_FOUND));
    }

    public List<Photo>getAllPhotos(){
        log.info("get all photos");
        return photoRepository.findAll();
    }


}
