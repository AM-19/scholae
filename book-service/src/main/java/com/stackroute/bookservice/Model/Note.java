package com.stackroute.bookservice.Model;


/*
For the Storing notes on a particular books
 */

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.index.Indexed;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Note {
    //@Indexed(unique = true)
    private String userEmail;
    private String noteTitle;
    private String noteContent;
}
