package com.stackroute.bookrecommendationservice.service;

import com.stackroute.bookrecommendationservice.model.Author;
import com.stackroute.bookrecommendationservice.model.Book;
import com.stackroute.bookrecommendationservice.model.User;

import java.util.List;

public interface RecommendationService {
    public List<Book> generateRecommendations(String emailId);
    public List<Book> getFavouritesList(String emailId);
    public List<Book> getInProgressBookList(String emailId);
    public List<Book> getCompletedBookList(String emailId);

    public List<Book> retrieveAllBooks();
    public List<Author> retrieveAllAuthors();
    public List<User> retrieveAllUsers();

    public void createBookAuthorRelationship(String bookTitle,String authorName);
    public String createBookNode(Book book);

    public String checkIfFavourite(String emailId,String bookTitle);
	public String favouriteBook(String emailId,String bookTitle);
    public String unFavouriteBook(String emailId,String bookTitle);

    public String checkIfReading(String emailId,String bookTitle);
    public String checkIfCompleted(String emailId,String bookTitle);
    public String userStartedReadingBook(String emailId,String bookTitle);
    public String userCompletedReadingBook(String emailId,String bookTitle);
	
	public String increaseBookDownloads(String bookTitle);
	public String increaseBookViews(String bookTitle);
	
	public String updateCurrentPageNumber(String emailId,String bookTitle,int pageNumber);
	public int returnCurrentPageNumber(String emailId,String bookTitle);

	public String getBookDescription(String bookTitle);
	public List<Book> mostViewedBooks(int numBooks);

}
