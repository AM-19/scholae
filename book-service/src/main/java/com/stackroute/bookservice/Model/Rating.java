package com.stackroute.bookservice.Model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
For the ratings on a particular books
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Rating {
    private int ratingStar;
    private String userEmail;
}
