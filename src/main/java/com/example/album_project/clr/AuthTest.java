package com.example.album_project.clr;

import com.example.album_project.auth.LoginManager;
import com.example.album_project.auth.RegistrationManager;
import com.example.album_project.beans.AppUser;
import com.example.album_project.beans.Credentials;
import com.example.album_project.enums.AppUserType;
import com.example.album_project.repository.AppUserRepository;
import com.example.album_project.service.AppUserService;
import com.example.album_project.service.ClientService;
import com.example.album_project.service.PhotographerService;
import com.example.album_project.util.Art;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class AuthTest implements CommandLineRunner {



    private final LoginManager loginManager;
    private final AppUserRepository appUserRepository;
    private final RegistrationManager registrationManager;

    @Override
    public void run(String... args)  {

try {


    System.out.println(Art.auth);

    //client login
//    AppUserService appUserService = loginManager.login("username", "123");
//    if (appUserService instanceof ClientService)
//        System.out.println(((ClientService) appUserService).getDetails());

    //photographer login
//    AppUserService appUserService = loginManager.login("useradam", "321");
//    if (appUserService instanceof PhotographerService){
//        System.out.println(((PhotographerService) appUserService).getDetails());
//    }

    //register
    Credentials credentials = new Credentials("first", "last", "user", "test"
    , "pass", AppUserType.PHOTOGRAPHER);
    registrationManager.register(credentials);


}catch (Exception e){
    System.out.println(e.getMessage());
}
    }
}
