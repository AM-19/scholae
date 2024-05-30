package com.stackroute.bookrecommendationservice.repository;

import com.stackroute.bookrecommendationservice.model.Book;
import com.stackroute.bookrecommendationservice.model.User;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends Neo4jRepository<User,Long> {

    @Query("MATCH(u1:User {emailId:$emailId})-[:read]->(:Book)<-[:read]-(u2:User)-[:read]->(b:Book)  WHERE u1<>u2 AND NOT (u1)-[:read]->(b)  WITH b,count(b) as frequency  ORDER BY frequency DESC  RETURN  b")
    List<Book> collaborativeFilteringRecommendations(String emailId);

    @Query("MATCH(u:User {emailId:$emailId})-[:favourite]->(b:Book) RETURN b")
    List<Book> userFavouriteBooks(String emailId);

    @Query("MATCH(u:User {emailId:$emailId})-[:read {status:'in_progress'}]->(b:Book) RETURN b")
    List<Book> userCurrentReadingBooks(String emailId);

    @Query("MATCH(u:User {emailId:$emailId})-[:read {status:'completed'}]->(b:Book) RETURN b")
    List<Book> userFinishedReadingBooks(String emailId);

    @Query("MATCH(u:User {emailId:$emailId})-[r]->(b:Book {bookTitle:$bookTitle}) WHERE type(r)='favourite' RETURN 'Yes'")
    String checkIfFavourite(String emailId,String bookTitle);

    @Query("MATCH(u:User {emailId:$emailId}) RETURN u")
    List<User> findUsersByEmailId(String emailId);

    @Query("MATCH(u:User {emailId:$emailId}),(b:Book {bookTitle:$bookTitle}) CREATE(u)-[:favourite]->(b)")
    void addBookAsFavourite(String emailId,String bookTitle);

    @Query("MATCH(u:User {emailId:$emailId})-[r:favourite]->(b:Book {bookTitle:$bookTitle}) DELETE r")
    void removeBookAsFavourite(String emailId,String bookTitle);

    @Query("MATCH(u:User {emailId:$emailId}),(b:Book {bookTitle:$bookTitle}) CREATE (u)-[r:read {status:'in_progress'}]->(b)")
    void addReadRelationship(String emailId,String bookTitle);

    @Query("MATCH(u:User {emailId:$emailId})-[r:read]->(b:Book {bookTitle:$bookTitle}) SET r.status='completed' REMOVE r.currentPageNumber")
    void addCompletedStatus(String emailId,String bookTitle);

    @Query("MATCH(u:User {emailId:$emailId})-[:read {status:'in_progress'}]->(b:Book {bookTitle:$bookTitle}) RETURN 'Yes'")
    String checkInProgressStatus(String emailId,String bookTitle);

    @Query("MATCH(u:User {emailId:$emailId})-[:read {status:'completed'}]->(b:Book {bookTitle:$bookTitle}) RETURN 'Yes'")
    String checkCompletedStatus(String emailId,String bookTitle);

	@Query("MATCH(u:User {emailId:$emailId})-[:read]->(b:Book) RETURN COUNT(b)")
	int countUserReads(String emailId);
	
	@Query("MATCH(b:Book {bookTitle:$bookTitle}) SET b.totalDownloads=b.totalDownloads+1")
	void increaseBookDownloads(String bookTitle);

	@Query("MATCH(b:Book {bookTitle:$bookTitle}) SET b.totalViews=b.totalViews+1")
	void increaseBookViews(String bookTitle);

	@Query("MATCH(:User {emailId:$emailId})-[r:read {status:'in_progress'}]->(:Book {bookTitle:$bookTitle}) SET r.currentPageNumber=$pageNumber")
	void updateCurrentPageNumber(String emailId,String bookTitle,int pageNumber);
	
	@Query("MATCH(:User {emailId:$emailId})-[r:read {status:'in_progress'}]->(:Book {bookTitle:$bookTitle}) RETURN r.currentPageNumber")
	int returnCurrentPageNumber(String emailId,String bookTitle);

	@Query("MATCH(b:Book {bookTitle:$bookTitle}) RETURN b.description")
	String getBookDescription(String bookTitle);
	
    @Query("MATCH(b:Book) RETURN b ORDER BY b.totalViews DESC LIMIT $numBooks")
    List<Book> mostViewedBooks(int numBooks);
}
