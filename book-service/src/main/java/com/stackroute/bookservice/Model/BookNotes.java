package com.stackroute.bookservice.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;



@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookNotes {
    @Id
    String bookTitle;
    List<Note> notes;
    public BookNotes(String bookTitle) {
        this.bookTitle = bookTitle;
    }
}
