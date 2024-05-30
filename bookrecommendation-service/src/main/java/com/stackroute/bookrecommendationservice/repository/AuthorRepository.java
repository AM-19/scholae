package com.stackroute.bookrecommendationservice.repository;

import com.stackroute.bookrecommendationservice.model.Author;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorRepository extends Neo4jRepository<Author,Long> {
    @Query("MATCH(a:Author {authorName:$authorName}) RETURN a")
    List<Author> findAuthorsByAuthorName(String authorName);

}
