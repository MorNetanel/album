package com.example.album_project.beans;

import com.example.album_project.enums.PhotoType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "photos")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private LocalDateTime dateTime;

    private String image;
    @Enumerated(EnumType.STRING)
    private PhotoType photoType;

    private String location;
    @ManyToOne
    private Photographer photographer;


}
