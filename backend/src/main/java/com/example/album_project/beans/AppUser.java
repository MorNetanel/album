package com.example.album_project.beans;

import com.example.album_project.enums.AppUserType;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Document
@Data
public class AppUser {

    @Id
    private UUID uuid;
    private String firstName;
    @NotNull(message = "User's last name must not be null")
    private String lastName;
    @Indexed(unique = true)
    @NotNull(message = "User's username must not be null")
    private String username;
    @Indexed(unique = true)
    @NotNull(message = "User's email must not be null")
    private String email;
    @NotNull(message = "User's password must not be null")
    private String password;
    @NotNull(message = "User's type must not be null")
    private AppUserType appUserType;

    public AppUser(UUID uuid, String firstName, String lastName, String username, String email, String password, AppUserType appUserType) {
        this.uuid = uuid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.appUserType = appUserType;
    }
}
