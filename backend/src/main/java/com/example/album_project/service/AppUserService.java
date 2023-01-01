package com.example.album_project.service;

import com.example.album_project.exceptions.ClientException;
import com.example.album_project.repository.AppUserRepository;
import com.example.album_project.repository.ClientRepository;
import com.example.album_project.repository.PhotographerRepository;
import org.springframework.stereotype.Service;

@Service
public abstract class AppUserService {

    private AppUserRepository appUserRepository;
    private ClientRepository clientRepository;
    private PhotographerRepository photographerRepository;

    public abstract int login (String email) throws ClientException;
}
