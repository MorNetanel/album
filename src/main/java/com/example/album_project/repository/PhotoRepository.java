package com.example.album_project.repository;

import com.example.album_project.beans.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Integer> {


    Optional<Photo> getPhotoByIdAndPhotographerId(int photoId, int photographerId);

    List<Photo> getPhotosByPhotographerId(int photographerId);
    int deletePhotoByIdAndPhotographerId(int photoId, int photographerId);
}
