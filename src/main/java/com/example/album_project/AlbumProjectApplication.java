package com.example.album_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy
public class AlbumProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(AlbumProjectApplication.class, args);
	}

}
