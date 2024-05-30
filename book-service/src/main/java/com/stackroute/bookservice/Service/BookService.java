package com.stackroute.bookservice.Service;

import com.stackroute.bookservice.Model.Book;
import com.stackroute.bookservice.Model.BookNotes;
import com.stackroute.bookservice.Model.Note;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface BookService {
    //To index book in ElasticSearch
    String saveDocumentInput(Book book) throws Exception;
    List<Book> findBook(String text);
    String contentForAudio(String bookTitle);
    void deleteBook(String bookTitle) throws IOException;
    List<Note> getAllNotes(String bookTitle,String userEmail);
    Optional<BookNotes> getBookNote(String bookTitle);
    void save(BookNotes bookNotes);
   // void deleteNotes(String )
}
