package com.example.album_project.beans;

import com.example.album_project.enums.PhotoType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "photos")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private int id;
    @Column(nullable = true, unique = true)
    private String name;
    private LocalDate dateTime;

    private String image;
    private double price;
    @Enumerated(EnumType.STRING)
    private PhotoType photoType;

    private String location;
    @ManyToOne
    @ToString.Exclude
    @JsonIgnore
    private Photographer photographer;

    public Photo(String name, String image, double price, PhotoType photoType, String location) {
        this.name = name;
        this.image = image;
        this.price = price;
        this.photoType = photoType;
        this.location = location;
    }
}
