package com.example.album_project.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.album_project.auth.LoginManager;
import com.example.album_project.auth.RegistrationManager;
import com.example.album_project.beans.Credentials;
import com.example.album_project.beans.UserSession;
import com.example.album_project.enums.AppUserType;
import com.example.album_project.exceptions.ClientException;
import com.example.album_project.exceptions.LoginException;
import com.example.album_project.exceptions.PhotographerException;
import com.example.album_project.service.AppUserService;
import com.example.album_project.service.ClientService;
import com.example.album_project.service.PhotographerService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Date;
import java.util.HashMap;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
@Slf4j
public class AuthController {

    private LoginManager loginManager;
    private RegistrationManager registrationManager;
    protected HashMap<String, UserSession> sessions;



    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) throws LoginException, ClientException, PhotographerException {
        AppUserService appUserService = null;

        appUserService = loginManager.login(username, password);
        String firstName = "";
        String lastName= "";
        String email= "";
        AppUserType appUserType = AppUserType.DEFAULT;
        int id = 0;

        if (appUserService instanceof PhotographerService){
            firstName = ((PhotographerService) appUserService).getDetails().getFirstName();
            lastName = ((PhotographerService) appUserService).getDetails().getLastName();
            email = ((PhotographerService) appUserService).getDetails().getLastName();
            appUserType = AppUserType.PHOTOGRAPHER;
            id = ((PhotographerService) appUserService).getId();
        }
        else if (appUserService instanceof ClientService){
            firstName = ((ClientService) appUserService).getDetails().getFirstName();
            lastName = ((ClientService) appUserService).getDetails().getLastName();
            email = ((ClientService) appUserService).getDetails().getLastName();
            appUserType = AppUserType.CLIENT;
            id = ((ClientService) appUserService).getId();}

        String token = createToken(username,firstName, lastName, email, appUserType, id);
        log.info("put in sessions new app user service");
        sessions.put(token, new UserSession(appUserService, System.currentTimeMillis()));
        return ResponseEntity.accepted().body(token);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Credentials credentials) throws LoginException, ClientException {
        AppUserService appUserService = registrationManager.register(credentials);
        String token = "";
        switch (credentials.getAppUserType()){
            case PHOTOGRAPHER :
                 token = createToken(credentials.getUsername(), credentials.getFirstName(),
                        credentials.getLastName(), credentials.getEmail(), AppUserType.PHOTOGRAPHER,
                        ((PhotographerService) appUserService).getId());
                log.info("put in sessions new app user service");
                sessions.put(token, new UserSession(appUserService, System.currentTimeMillis()));
                return ResponseEntity.accepted().body(token);

            case CLIENT:
               
                 token = createToken(credentials.getUsername(), credentials.getFirstName(),
                        credentials.getLastName(), credentials.getEmail(), AppUserType.CLIENT,
                        ((ClientService) appUserService).getId());


                log.info("put in sessions new app user service");
                sessions.put(token, new UserSession(appUserService, System.currentTimeMillis()));


                return ResponseEntity.accepted().body(token);

        }
        return null;

    }







    private String createToken(String username, String firstName, String lastName,
                               String email, AppUserType appUserType,  int id){
        String token = JWT.create()
                .withIssuer("NatiMor")
                .withIssuedAt(new Date())
                .withClaim("id", id)
                .withClaim("username", username)
                .withClaim("first name", firstName)
                .withClaim("last name", lastName)
                .withClaim("email", email)
                .withClaim("client type", appUserType.toString())
                .sign(Algorithm.HMAC256("javafullstackdeveloper"));
        return token;
    }





}
