package com.example.album_project.repository;

import com.example.album_project.beans.AppUser;
import com.example.album_project.enums.AppUserType;
import org.springframework.data.mongodb.repository.MongoRepository;


import java.util.Optional;
import java.util.UUID;


public interface AppUserRepository extends MongoRepository<AppUser, UUID> {

    Optional<AppUser> findAppUserByUsername(String username);

    Optional<AppUser> findAppUserByUsernameAndPassword(String username, String password);

    Optional<AppUser> findAppUserByEmail(String email);
}
