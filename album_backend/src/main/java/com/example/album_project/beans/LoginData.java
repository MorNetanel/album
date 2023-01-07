package com.example.album_project.beans;

import lombok.Data;
import org.springframework.data.mongodb.core.index.Indexed;

import javax.validation.constraints.NotNull;

@Data
public class LoginData {



    private String username;
    private String password;
}
