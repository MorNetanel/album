package com.example.album_project.repository;

import com.example.album_project.beans.Photo;
import com.example.album_project.enums.PhotoType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Integer> {


    @Query(value = "select * from photos where id = ?1 and photographer_id =?2", nativeQuery = true)
    Optional<Photo> getPhotoByIdAndPhotographerId(int photoId, int photographerId);

    List<Photo> getPhotosByPhotographerId(int photographerId);
    int deletePhotoByIdAndPhotographerId(int photoId, int photographerId);

    @Query(value = "select * from photos where date_time > ?1 and date_time <?2", nativeQuery = true)
    List<Photo> getPhotosBetweenDates(LocalDate startDate, LocalDate endDate);

    List<Photo> getPhotosByLocation(String location);

    List<Photo> getPhotosByPhotoType(PhotoType photoType);

    Optional<Photo> getPhotoByName(String name);

    List<Photo> findAllByPriceBetween(double minPrice, double maxPrice);

    @Query(value = "select client_id from clients_photos where client_id = ?1 and photos_id = ?2", nativeQuery = true)
    Optional<Integer> isPhotoPurchasedByClient(int clientId, int photoId);

    @Modifying
    @Query(value = "insert into clients_photos values (?1, ?2)", nativeQuery = true)
    void purchasePhoto(int clientId, int PhotoId);

    @Query(value = "select * from photos join clients_photos on photos.id = clients_photos.photos_id where clients_photos.client_id = ?1", nativeQuery = true)
    List<Photo>getAllPurchasedPhotosByClientId(int clientId);




}
