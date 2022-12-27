package com.example.album_project.repository;

import com.example.album_project.beans.Photographer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PhotographerRepository extends JpaRepository<Photographer, Integer> {


    @Query(value = "select * from photographers where first_name = ?1 and last_name = ?2", nativeQuery = true)
    Photographer findByFirstNameAndLastName(String firstName, String lastName);

    Optional<Integer> findIdByEmail(String email);
}
