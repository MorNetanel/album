package com.example.album_project.beans;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "clients")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Client {

    @Id
    @Setter(AccessLevel.NONE)
    private int id;
    private String firstName;
    private String lastName;
    @Column(unique = true, nullable = false)
    private String email;

    @ManyToMany
    private Set<Photo> photos = new HashSet<>();
}
