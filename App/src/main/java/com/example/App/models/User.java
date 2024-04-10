package com.example.App.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {
   
    private long id;
    private String firstName;
    private String lastName;
    private String emailId;
}
