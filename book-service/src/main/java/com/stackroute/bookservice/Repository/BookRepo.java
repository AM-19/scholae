package com.stackroute.bookservice.Repository;
import com.stackroute.bookservice.Model.BookNotes;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;



@Repository
public interface BookRepo extends MongoRepository<BookNotes,String> {
}
