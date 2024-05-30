package com.stackroute.bookrecommendationservice.service;

//import org.neo4j.driver.*;
//import static org.neo4j.driver.Values.parameters;

import com.stackroute.bookrecommendationservice.model.Author;
import com.stackroute.bookrecommendationservice.model.Book;
import com.stackroute.bookrecommendationservice.model.User;
import com.stackroute.bookrecommendationservice.repository.AuthorRepository;
import com.stackroute.bookrecommendationservice.repository.BookRepository;
import com.stackroute.bookrecommendationservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RecommendationServiceImpl implements RecommendationService {

    private BookRepository bookRepository;
    private AuthorRepository authorRepository;
    private UserRepository userRepository;
    @Autowired
    public RecommendationServiceImpl(BookRepository bookRepository,AuthorRepository authorRepository,UserRepository userRepository){
        this.bookRepository=bookRepository;
        this.authorRepository=authorRepository;
        this.userRepository=userRepository;
    }

    @Override
    public List<Book> generateRecommendations(String emailId){
        return (List<Book>) this.userRepository.collaborativeFilteringRecommendations(emailId);
    }

    @Override
    public List<Book> getFavouritesList(String emailId){
        return this.userRepository.userFavouriteBooks(emailId);
    }

    @Override
    public List<Book> getInProgressBookList(String emailId){
        return this.userRepository.userCurrentReadingBooks(emailId);
    }

    @Override
    public List<Book> getCompletedBookList(String emailId){
        return this.userRepository.userFinishedReadingBooks(emailId);
    }

    @Override
    public List<Book> retrieveAllBooks(){
        List<Book> books = (List<Book>) this.bookRepository.findAll();
        Collections.reverse(books);
        return books;
    }

    @Override
    public List<Author> retrieveAllAuthors() {
        return (List<Author>) this.authorRepository.findAll();
    }

    @Override
    public List<User> retrieveAllUsers(){
        return (List<User>) this.userRepository.findAll();
    }

    @Override
    public void createBookAuthorRelationship(String bookTitle,String authorName){
        List<Author> existingAuthors = authorRepository.findAuthorsByAuthorName(authorName);
        if(existingAuthors.size()==0){
            Author bookAuthor = new Author(authorName);
            this.authorRepository.save(bookAuthor);
        }
        this.bookRepository.createAuthoredByRelationship(bookTitle,authorName);
    }

    @Override
    public String createBookNode(Book book){
        String bookTitle = book.getBookTitle();
        List<Book> books = bookRepository.findBooksByBookTitle(bookTitle);
        if(books.size() == 0){
            this.bookRepository.save(book);
            String[] authorNames = book.getAuthorName().split(",");
            if(authorNames.length==1){
                createBookAuthorRelationship(bookTitle,book.getAuthorName());
            }
            else{
                for(String author: authorNames){
                    createBookAuthorRelationship(bookTitle,author);
                }
            }
            return "Book Node created";
        }
        else{
            return "Book Already Exists in Database";
        }
    }

    @Override
    public String checkIfFavourite(String emailId,String bookTitle){
        String result = this.userRepository.checkIfFavourite(emailId,bookTitle);
        if(result!=null && !result.isEmpty()){
            return "Book is favourite";
        }
        else{
            return "Not favourite";
        }
    }

    @Override
    public String favouriteBook(String emailId, String bookTitle) {
        List<User> users = this.userRepository.findUsersByEmailId(emailId);
        if(users.size()==0){
            User user = new User(emailId);
            this.userRepository.save(user);
        }
        this.userRepository.addBookAsFavourite(emailId,bookTitle);
        return "Book Added as Favourite";
    }

    @Override
    public String unFavouriteBook(String emailId, String bookTitle) {
        this.userRepository.removeBookAsFavourite(emailId,bookTitle);
        return "Book Removed from Favourite";
    }

    @Override
    public String checkIfReading(String emailId,String bookTitle){
        String result = this.userRepository.checkInProgressStatus(emailId,bookTitle);
        if(result!=null && !result.isEmpty()){
            return "User is reading book";
        }
        else{
            return "Not reading book";
        }
    }

    @Override
    public String checkIfCompleted(String emailId,String bookTitle){
        String result = this.userRepository.checkCompletedStatus(emailId,bookTitle);
        if(result!=null && !result.isEmpty()){
            return "User has completed book";
        }
        else{
            return "Not completed book";
        }
    }

    @Override
    public String userStartedReadingBook(String emailId, String bookTitle) {
        List<User> users = this.userRepository.findUsersByEmailId(emailId);
        if(users.size()==0){
            User user = new User(emailId);
            this.userRepository.save(user);
        }
        String result = this.userRepository.checkInProgressStatus(emailId,bookTitle);
        if(result==null || result.isEmpty()){
			this.userRepository.addReadRelationship(emailId,bookTitle);
        }
        return "User started reading book";
    }

    @Override
    public String userCompletedReadingBook(String emailId, String bookTitle) {
        String result = this.userRepository.checkCompletedStatus(emailId,bookTitle);
        if(result==null || result.isEmpty()){
			this.userRepository.addCompletedStatus(emailId,bookTitle);
        }
        return "User completed reading book";
    }

	@Override
    public String increaseBookDownloads(String bookTitle) {
        this.userRepository.increaseBookDownloads(bookTitle);
        return "Book downloads updated";
    }

	@Override
    public String increaseBookViews(String bookTitle) {
        this.userRepository.increaseBookViews(bookTitle);
        return "Book views updated";
    }
    @Override
    public String updateCurrentPageNumber(String emailId, String bookTitle, int pageNumber) {
		this.userRepository.updateCurrentPageNumber(emailId,bookTitle,pageNumber);
		return "User Progress Updated";
    }

    @Override
    public int returnCurrentPageNumber(String emailId, String bookTitle) {
		int currentPageNumber = this.userRepository.returnCurrentPageNumber(emailId,bookTitle);
//		System.out.println("\n\n\nIn Service Impl of getPage Number.This is the result : "+currentPageNumber);
		return currentPageNumber;
    }
	
	@Override
	public String getBookDescription(String bookTitle){
		return this.userRepository.getBookDescription(bookTitle);
	}
	
	@Override
	public List<Book> mostViewedBooks(int numBooks){
		return this.userRepository.mostViewedBooks(numBooks);
	}
}
