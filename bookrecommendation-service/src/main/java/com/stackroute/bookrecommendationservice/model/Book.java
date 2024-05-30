package com.stackroute.bookrecommendationservice.model;

import org.neo4j.ogm.annotation.*;

@NodeEntity
public class Book {
    @Id
    @GeneratedValue
    private Long id;
    private String bookTitle;
    private String authorName;
//    @Relationship("authored_by")
//    private Author author;
    private String description;
    private String bookUrl;
    private Long totalViews;
    private int totalPage;
    private String publisher;
    private long totalDownloads;
    private String imageUrl;
    private String isbnNumber;
	private String genre;
	
    public Book() {
    }

    public String getAuthorName() {
        return authorName;
    }

    public Long getId() {
        return id;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public String getDescription() {
        return description;
    }

    public String getBookUrl() {
        return bookUrl;
    }

    public Long getTotalViews() {
        return totalViews;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public String getPublisher() {
        return publisher;
    }

    public long getTotalDownloads() {
        return totalDownloads;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getIsbnNumber() {
        return isbnNumber;
    }

    public String getGenre() {
		return genre;
	}
	
	@Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", bookTitle='" + bookTitle + '\'' +
                ", authorName='" + authorName + '\'' +
                ", description='" + description + '\'' +
                ", bookUrl='" + bookUrl + '\'' +
                ", totalViews=" + totalViews +
                ", totalPage=" + totalPage +
                ", publisher='" + publisher + '\'' +
                ", totalDownloads=" + totalDownloads +
                ", imageUrl='" + imageUrl + '\'' +
                ", isbnNumber='" + isbnNumber + '\'' +
                ", genre='" + genre + '\'' +
                '}';
    }

    public Book(String bookTitle, String authorName, String description, String bookUrl, Long totalViews, int totalPage, String publisher, long totalDownloads, String imageUrl, String isbnNumber, String genre) {
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