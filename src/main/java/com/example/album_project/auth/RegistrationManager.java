package com.example.album_project.auth;

import com.example.album_project.beans.AppUser;
import com.example.album_project.beans.Client;
import com.example.album_project.beans.Credentials;
import com.example.album_project.beans.Photographer;
import com.example.album_project.enums.ErrMsg;
import com.example.album_project.exceptions.ClientException;
import com.example.album_project.exceptions.LoginException;
import com.example.album_project.exceptions.PhotographerException;
import com.example.album_project.repository.AppUserRepository;
import com.example.album_project.service.AppUserService;
import com.example.album_project.service.ClientService;
import com.example.album_project.service.PhotographerService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.UUID;

@Service
@Slf4j
@AllArgsConstructor
public class RegistrationManager {

    private final AppUserRepository appUserRepository;
    private final ClientService clientService;
    private final PhotographerService photographerService;
    private final LoginManager loginManager;

    @Transactional
    public AppUserService register(Credentials credentials) throws LoginException, ClientException, PhotographerException {
        //check if user is in the data base
        System.out.println("registration manager credentials" + credentials.getEmail());
        if (appUserRepository.findAppUserByEmail(credentials.getEmail()).isPresent()
                ||
                appUserRepository.findAppUserByUsername(credentials.getUsername()).isPresent()){
        throw new LoginException(ErrMsg.REGISTRATION_FAILURE);
    }
        else {
            //create and insert app user into data base/mongo
            AppUser appUser = new AppUser(UUID.randomUUID(), credentials.getFirstName(),
                    credentials.getLastName(), credentials.getUsername(), credentials.getEmail(),
                    credentials.getPassword(), credentials.getAppUserType());
            appUserRepository.insert(appUser);

        }
        //create and insert app user into data base/sql
        switch (credentials.getAppUserType()){
            case CLIENT :
                Client client = new Client(credentials.getFirstName(), credentials.getLastName(),
                        credentials.getEmail());
                clientService.register(client);
                break;
            case PHOTOGRAPHER:
                Photographer photographer = new Photographer(credentials.getFirstName(), credentials.getLastName(),
                        credentials.getEmail());
                photographerService.register(photographer);
                break;
        }
       return loginManager.login(credentials.getUsername(), credentials.getPassword());
    }



}
