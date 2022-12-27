package com.example.album_project.service;

import com.example.album_project.beans.Client;
import com.example.album_project.beans.Credentials;
import com.example.album_project.beans.Photo;
import com.example.album_project.beans.Photographer;
import com.example.album_project.enums.ErrMsg;
import com.example.album_project.enums.PhotoType;
import com.example.album_project.exceptions.ClientException;
import com.example.album_project.repository.ClientRepository;
import com.example.album_project.repository.PhotoRepository;
import com.example.album_project.repository.PhotographerRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ClientService extends AppUserService {


    @Getter
    private int id = -1;
    private final PhotoRepository photoRepository;

    private final PhotographerRepository photographerRepository;

    private final ClientRepository clientRepository;

    public Client getDetails() throws ClientException {
        return clientRepository.findById(id).orElseThrow(()-> new ClientException(ErrMsg.ID_NOT_FOUND));
    }

    public int login (String email) throws ClientException {
         if(clientRepository.findIdByEmail(email).isPresent())
             this.id = clientRepository.findIdByEmail(email).orElseThrow(()-> new ClientException(ErrMsg.EMAIL_NOT_FOUND));
         return id;
    }

    public void register(Client client){
         clientRepository.save(client);
    }

    public Photo getOnePhoto(int photoId) throws ClientException {
        log.info("get photo id: {}", photoId);
        return photoRepository.findById(photoId).orElseThrow(() -> new ClientException(ErrMsg.ID_NOT_FOUND));
    }

    public List<Photo> getAllPhotos() {
        log.info("get all photos");
        return photoRepository.findAll();
    }

    public List<Photo> getPhotosBetweenPrices(double minPrice, double maxPrice) {
        return photoRepository.findAllByPriceBetween(minPrice, maxPrice);
    }

    public Photo getPhotoByName(String photoName) throws ClientException {
        return photoRepository.getPhotoByName(photoName).orElseThrow(() ->
                new ClientException(ErrMsg.PHOTO_NOT_FOUND_BY_NAME));
    }

    public List<Photo> getPhotosByType(PhotoType photoType) {
        return photoRepository.getPhotosByPhotoType(photoType);
    }

    public List<Photo> getPhotosByDates(LocalDate startDate, LocalDate endDate) {
        return photoRepository.getPhotosBetweenDates(startDate, endDate);
    }

    public List<Photo> getPhotosByLocation(String location) {
        return photoRepository.getPhotosByLocation(location);
    }

    public List<Photo> getPhotosByPhotographer(String fName, String lName) throws ClientException {
        Photographer photographer = photographerRepository.findByFirstNameAndLastName(fName, lName);

        if (photographer != null) {
            return photoRepository.getPhotosByPhotographerId(photographer.getId());
        } else throw new ClientException(ErrMsg.PHOTOGRAPHER_NOT_FOUND_BY_NAME);
    }

    public void purchasePhoto(Photo photo) throws ClientException {
        if (!isPhotoPurchasedByClient( photo.getId())) {
            log.info("purchase photo id {} by client id {}", photo.getId(),id);


            photoRepository.purchasePhoto(id, photo.getId());
        }
                else throw new ClientException(ErrMsg.PHOTO_PURCHASE_UNAVAILABLE);
    }


    public boolean isPhotoPurchasedByClient( int photoId) {

        if (photoRepository.isPhotoPurchasedByClient(id, photoId).isPresent()){
            log.info("photo has been purchased by client");
            return true;
        }
        log.info("photo has not been purchased by client");
        return false;

    }
}


