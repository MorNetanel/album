package com.example.album_project.clr;


import com.example.album_project.auth.LoginManager;
import com.example.album_project.enums.PhotoType;
import com.example.album_project.service.ClientService;
import com.example.album_project.util.Art;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class ClientServiceTest implements CommandLineRunner {


    private final ClientService clientService;
    private final LoginManager loginManager;

    @Override
    public void run(String... args)  {

        try {


//            System.out.println(Art.clientService);
//
//            ClientService service = (ClientService) loginManager.login("2", "pass");
//
//            service.getPhotosByLocation("ramat gan").forEach(System.out::println);

        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
}
