package com.example.album_project.repository;

import com.example.album_project.beans.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AppUserRepository extends MongoRepository<AppUser, UUID> {
}
