package com.example.album_project.beans;

import com.example.album_project.service.AppUserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Data
public class UserSession {


    private final AppUserService appUserService;
    private final long lastActive;



}
