package com.example.album_project.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.album_project.auth.LoginManager;
import com.example.album_project.auth.RegistrationManager;
import com.example.album_project.beans.Credentials;
import com.example.album_project.beans.LoginData;
import com.example.album_project.beans.UserSession;
import com.example.album_project.enums.AppUserType;
import com.example.album_project.enums.ErrMsg;
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
@CrossOrigin
public class AuthController {

    private LoginManager loginManager;
    private RegistrationManager registrationManager;
    protected HashMap<String, UserSession> sessions;



    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginData loginData) throws LoginException, ClientException, PhotographerException {
        AppUserService appUserService = null;

        appUserService = loginManager.login(loginData.getUsername(), loginData.getPassword());
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

        String token = createToken(loginData.getUsername(),firstName, lastName, email, appUserType, id);
        log.info("put in sessions new app user service");
        sessions.put(token, new UserSession(appUserService, System.currentTimeMillis()));
        return ResponseEntity.accepted().body(token);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Credentials credentials) throws LoginException, ClientException, PhotographerException {

        if (!isCredentialsValid(credentials)) {
            log.error("credentials not valid for email: {}" , credentials.getEmail());
            throw new LoginException(ErrMsg.REGISTRATION_FAILURE);
        } else {
            AppUserService appUserService = registrationManager.register(credentials);
            String token = "";
            switch (credentials.getAppUserType()) {
                case PHOTOGRAPHER:
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
    }






    private String createToken(String username, String firstName, String lastName,
                               String email, AppUserType appUserType,  int id){
        String token = JWT.create()
                .withIssuer("NatiMor")
                .withIssuedAt(new Date())
                .withClaim("id", id)
                .withClaim("username", username)
                .withClaim("firstName", firstName)
                .withClaim("lastName", lastName)
                .withClaim("email", email)
                .withClaim("clientType", appUserType.toString())
                .sign(Algorithm.HMAC256("NatiMor***javafullstackdeveloper"));
        return token;
    }

    private boolean isCredentialsValid(Credentials credentials){
        if (credentials == null|| credentials.getFirstName() == null ||credentials.getLastName() == null
        ||credentials.getEmail() == null || credentials.getUsername() == null
        ||credentials.getPassword() == null || credentials.getAppUserType() == null){
            log.error("credentials null");
            return false;}
        else

            return credentials.getFirstName().length() >= 2 && credentials.getLastName().length() >= 2
                && credentials.getEmail().length() >= 4 && credentials.getEmail().contains("@") &&
                credentials.getPassword().length() >= 4 && credentials.getUsername().length() >= 4 &&
                    (credentials.getAppUserType().equals(AppUserType.CLIENT) ||
                credentials.getAppUserType().equals(AppUserType.PHOTOGRAPHER));
    }





}
