package com.example.album_project.clr;


import com.example.album_project.service.ClientService;
import com.example.album_project.util.Art;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ClientServiceTest implements CommandLineRunner {


    private final ClientService clientService;

    @Override
    public void run(String... args)  {

        try {


            System.out.println(Art.clientService);
            clientService.getAllPhotos().forEach(System.out::println);

            System.out.println("---------get one photo--------");

            System.out.println(clientService.getOnePhoto(2));

        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
}
