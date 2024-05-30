package com.stackroute.bookservice.Model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;


@Data
//@AllArgsConstructor
public class MqBook {
    //String bookID = UUID.randomUUID().toString();
    private String bookTitle;
    private String authorName;
    private String description;
    private String bookUrl;
    private long totalViews;
    private int totalPage;
    private String publisher;
    private long totalDownloads;
    private String imageUrl;
    private String isbnNumber;
	private String genre;
	
    public MqBook(String bookTitle, String authorName, String description, String bookUrl, long totalViews, int totalPage, String publisher, long totalDownloads, String imageUrl, String isbnNumber, String genre) {
        this.bookTitle = bookTitle;
        this.authorName = authorName;
        this.description = description;
        this.bookUrl = bookUrl;
        this.totalViews = totalViews;
        this.totalPage = totalPage;
        this.publisher = publisher;
        this.totalDownloads = totalDownloads;
        this.imageUrl = imageUrl;
        this.isbnNumber = isbnNumber;
		this.genre = genre;
    }
}


