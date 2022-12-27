package com.example.album_project.auth;

import com.example.album_project.beans.AppUser;
import com.example.album_project.enums.AppUserType;
import com.example.album_project.enums.ErrMsg;
import com.example.album_project.exceptions.ClientException;
import com.example.album_project.exceptions.LoginException;
import com.example.album_project.repository.AppUserRepository;
import com.example.album_project.service.AppUserService;
import com.example.album_project.service.ClientService;
import com.example.album_project.service.PhotographerService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@AllArgsConstructor
public class LoginManager {

    private final AppUserRepository appUserRepository;
    private final ApplicationContext applicationContext;


    public AppUserService login (String username, String password) throws LoginException, ClientException {



        AppUser appUser = appUserRepository.findAppUserByUsernameAndPassword(username, password).orElseThrow(
                ()-> new LoginException(ErrMsg.LOGIN_FAILURE));




        switch (appUser.getAppUserType()){
            case CLIENT :
                ClientService clientService = applicationContext.getBean(ClientService.class);
                if (clientService.login(appUser.getEmail()) != -1)
                    return clientService;
                log.error("Login Error! email details: {}", appUser.getEmail() );
                break;
            case PHOTOGRAPHER :
                PhotographerService photographerService = applicationContext.getBean(PhotographerService.class);
                if (photographerService.login(appUser.getEmail()) != -1)
                    return photographerService;
                log.error("Login Error! email details: {}", appUser.getEmail() );
            break;
        }
        return null;
    }
}
