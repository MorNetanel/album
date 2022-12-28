package com.example.album_project.beans;

import com.example.album_project.enums.AppUserType;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.index.Indexed;

@Data
@AllArgsConstructor
public class Credentials {



    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
    private AppUserType appUserType;


}
