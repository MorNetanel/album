package com.example.album_project.repository;

import com.example.album_project.beans.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Integer> {


    Optional<Integer> findIdByEmail(String email);
}
