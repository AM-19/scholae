package com.stackroute.bookrecommendationservice.controller;

import com.stackroute.bookrecommendationservice.model.Author;
import com.stackroute.bookrecommendationservice.model.Book;
import com.stackroute.bookrecommendationservice.model.User;
import com.stackroute.bookrecommendationservice.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class RecommendationController {
    private RecommendationService recommendationService;

    @Autowired
    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping("/recommendations")
    public ResponseEntity<List<Book>> generateRecommendations(@RequestParam(value = "emailId") String emailId){
        return new ResponseEntity<List<Book>>(this.recommendationService.generateRecommendations(emailId), HttpStatus.OK);
    }

    @GetMapping("/favourites")
    public ResponseEntity<List<Book>> getFavouritesList(@RequestParam(value="emailId") String emailId){
        return new ResponseEntity<List<Book>>(recommendationService.getFavouritesList(emailId),HttpStatus.OK);
    }

    @GetMapping("/reading")
    public ResponseEntity<List<Book>> getInProgressBookList(@RequestParam(value="emailId") String emailId){
        return new ResponseEntity<List<Book>>(recommendationService.getInProgressBookList(emailId),HttpStatus.OK);
    }

    @GetMapping("/completelist")
    public ResponseEntity<List<Book>> getCompletedBookList(@RequestParam(value="emailId") String emailId){
        return new ResponseEntity<List<Book>>(recommendationService.getCompletedBookList(emailId),HttpStatus.OK);
    }

    @GetMapping("/books")
    public ResponseEntity<List<Book>> retrieveAllBooks(){
        return new ResponseEntity<List<Book>>(this.recommendationService.retrieveAllBooks(), HttpStatus.OK);
    }

    @GetMapping("/authors")
    public ResponseEntity<List<Author>> retrieveAllAuthors(){
        return new ResponseEntity<List<Author>>(this.recommendationService.retrieveAllAuthors(), HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> retrieveAllUsers(){
        return new ResponseEntity<List<User>>(this.recommendationService.retrieveAllUsers(), HttpStatus.OK);
    }

    @PostMapping("/book")
    public ResponseEntity<String> createBookNode(@RequestBody Book book){
        String message = this.recommendationService.createBookNode(book);
        return new ResponseEntity<String>(message,HttpStatus.CREATED);
    }

    @GetMapping("/userfavourite")
    public ResponseEntity<String> checkIfFavourite(@RequestParam(value="emailId") String emailId, @RequestParam(value = "bookTitle") String bookTitle){
        return new ResponseEntity<String>(recommendationService.checkIfFavourite(emailId,bookTitle),HttpStatus.OK);
    }

    @PostMapping("/favourite")
    public ResponseEntity<String> favouriteBook(@RequestBody String title,@RequestParam(value = "emailId") String emailId, @RequestParam(value = "bookTitle") String bookTitle){
        String message = recommendationService.favouriteBook(emailId,bookTitle);
        return new ResponseEntity<String>(message,HttpStatus.CREATED);
    }

    @GetMapping("/unfavourite")
    public ResponseEntity<String> unFavouriteBook(@RequestParam(value = "emailId") String emailId, @RequestParam(value = "bookTitle") String bookTitle){
        String message = recommendationService.unFavouriteBook(emailId,bookTitle);
        return new ResponseEntity<String>(message,HttpStatus.CREATED);
    }

    @GetMapping("/userreading")
    public ResponseEntity<String> checkIfReading(@RequestParam(value="emailId") String emailId, @RequestParam(value = "bookTitle") String bookTitle){
        return new ResponseEntity<String>(recommendationService.checkIfReading(emailId,bookTitle),HttpStatus.OK);
    }

    @GetMapping("/usercompleted")
    public ResponseEntity<String> checkIfCompleted(@RequestParam(value="emailId") String emailId, @RequestParam(value = "bookTitle") String bookTitle){
        return new ResponseEntity<String>(recommendationService.checkIfCompleted(emailId,bookTitle),HttpStatus.OK);
    }

    @PostMapping("/startreading")
    public ResponseEntity<String> startBookReading(@RequestBody String title,@RequestParam(value = "emailId") String emailId, @RequestParam(value = "bookTitle") String bookTitle){
        String message = recommendationService.userStartedReadingBook(emailId,bookTitle);
        return new ResponseEntity<String>(message,HttpStatus.CREATED);
    }

    @GetMapping("/completed")
    public ResponseEntity<String> completeBookReading(@RequestParam(value = "emailId") String emailId, @RequestParam(value = "bookTitle") String bookTitle){
        String message = recommendationService.userCompletedReadingBook(emailId,bookTitle);
        return new ResponseEntity<String>(message,HttpStatus.ACCEPTED);
    }

    @PutMapping("/updatedownloads")
    public ResponseEntity<String> updateBookDownloads(@RequestBody String bookTitle){
        String message = recommendationService.increaseBookDownloads(bookTitle);
        return new ResponseEntity<String>(message,HttpStatus.ACCEPTED);
    }

    @PutMapping("/updateviews")
    public ResponseEntity<String> updateBookViews(@RequestBody String bookTitle){
        String message = recommendationService.increaseBookViews(bookTitle);
        return new ResponseEntity<String>(message,HttpStatus.ACCEPTED);
    }
    @GetMapping("/saveprogress")
    public ResponseEntity<String> saveUserProgress(@RequestParam(value = "emailId") String emailId, @RequestParam(value = "bookTitle") String bookTitle, @RequestParam(value = "pageNumber") String pageNumber){
//        System.out.println("\n\nIn backend of save progress. This is what we have received.\n"+bookTitle+"  "+emailId+"  "+pageNumber);
		String message = recommendationService.updateCurrentPageNumber(emailId,bookTitle,Integer.parseInt(pageNumber));
        return new ResponseEntity<String>(message,HttpStatus.ACCEPTED);
    }

    @GetMapping("/progress")
    public ResponseEntity<Integer> getUserProgress(@RequestParam(value = "emailId") String emailId, @RequestParam(value = "bookTitle") String bookTitle){
//        System.out.println("\n\nIn backend of get progress. This is what we have received.\n"+bookTitle+"  "+emailId);
		Integer currentPageNumber = recommendationService.returnCurrentPageNumber(emailId,bookTitle);
        return new ResponseEntity<Integer>(currentPageNumber,HttpStatus.OK);
    }
	
	@GetMapping("/description")
	public ResponseEntity<String> getBookDescriptionForAudio(@RequestParam(value = "bookTitle") String bookTitle){
		return new ResponseEntity<String>(this.recommendationService.getBookDescription(bookTitle),HttpStatus.OK);
	}
	
	@GetMapping("/mostviewed")
    public ResponseEntity<List<Book>> getBooksWithMostViews(@RequestParam(value = "numBooks") String numBooks){
        return new ResponseEntity<List<Book>>(this.recommendationService.mostViewedBooks(Integer.parseInt(numBooks)), HttpStatus.OK);
    }

}
