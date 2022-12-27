package com.example.album_project.beans;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "photographers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Photographer {

    @Id
    @Setter(AccessLevel.NONE)
    private int id;
    private String firstName;
    private String lastName;
    @Column(unique = true, nullable = false)
    private String email;

    @OneToMany(mappedBy = "photographer", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Photo> photos = new HashSet<>();

}
