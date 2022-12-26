package com.example.album_project.clr;

import com.example.album_project.beans.Photo;
import com.example.album_project.enums.PhotoType;
import com.example.album_project.service.PhotographerService;
import com.example.album_project.util.Art;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class PhotographerServiceTest implements CommandLineRunner {


    private final PhotographerService photographerService;

    @Override
    public void run(String... args) throws Exception {

        try {



//        System.out.println(Art.photographerService);



//        photographerService.getAllPhotographerPhotos().forEach(photo -> System.out.println(photo));


}catch (Exception e){
    System.out.println(e.getMessage());
}
    }
}
