package com.example.album_project.repository;

import com.example.album_project.beans.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Integer> {
}
