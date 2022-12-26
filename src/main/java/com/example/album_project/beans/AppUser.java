package com.example.album_project.beans;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Document
@Data
public class AppUser {

    @Id
    private UUID uuid;
    private String firstName;
    private String lastName;
    @Indexed(unique = true)
    private String userName;
    private String password;

}
