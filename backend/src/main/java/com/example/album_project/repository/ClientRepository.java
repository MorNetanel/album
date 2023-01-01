package com.example.album_project.repository;

import com.example.album_project.beans.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Integer> {


    @Query(value = "select id from clients where email = ?1", nativeQuery = true)
    Optional<Integer> findIdByEmail(String email);
}
