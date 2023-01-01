package com.example.album_project;

import com.example.album_project.beans.UserSession;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.HashMap;

@SpringBootApplication
@EnableAspectJAutoProxy
@EnableScheduling
public class AlbumProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(AlbumProjectApplication.class, args);
	}


	@Bean
	public HashMap<String, UserSession> sessions(){
		HashMap<String, UserSession> sessions = new HashMap<>();
		return sessions;
	}

}
