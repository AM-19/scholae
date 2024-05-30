package com.stackroute.bookservice.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import java.util.Date;
import java.util.List;
import java.util.UUID;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Book {
    String bookID = UUID.randomUUID().toString();
    @Id
    private String bookTitle;
    private String authorName;
    private String description;
    private String bookContent;
    private String bookUrl;
    private List<Rating> ratings;
    private long totalViews;
    private int totalPage;
    private String language;
    private String publisher;
    private Date firstPublish;
    private String genre;
    private List<Note> notes;
    private int readingTime;
    private long totalDownloads;
    private String uploadedBy;
    private Date uploadedOn;
    private String isbnNumber;
    private String imageUrl;


    public Book(String bookTitle, String authorName, String description, String bookContent,
                String bookUrl, int totalPage, String publisher,String genre, String imageUrl)
    {
        this.bookTitle = bookTitle;
        this.authorName = authorName;
        this.description = description;
        this.bookContent = bookContent;
        this.bookUrl = bookUrl;
        this.totalPage = totalPage;
        this.publisher = publisher;
        this.genre = genre;
        this.imageUrl = imageUrl;
    }


    public Book(String bookContent) {
        this.bookContent = bookContent;
    }

    public String getBookID() {
        return bookID;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public String getAuthorName() {
        return authorName;
    }

    public String getDescription() {
        return description;
    }

    public String getBookContent() {
        return bookContent;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public String getPublisher() {
        return publisher;
    }

    public String getGenre() {
        return genre;
    }

    @Override
    public String toString() {
        return "Book{" +
                "bookID='" + bookID + '\'' +
                ", bookTitle='" + bookTitle + '\'' +
                ", author_name='" + authorName + '\'' +
                ", description='" + description + '\'' +
                ", bookContent='" + bookContent + '\'' +
                ", bookUrl='" + bookUrl + '\'' +
                ", ratings=" + ratings +
                ", totalViews=" + totalViews +
                ", totalPage=" + totalPage +
                ", language='" + language + '\'' +
                ", publisher='" + publisher + '\'' +
                ", firstPublish=" + firstPublish +
                ", genre='" + genre + '\'' +
                ", notes=" + notes +
                ", readingTime=" + readingTime +
                ", totalDownloads=" + totalDownloads +
                ", uploadedBy='" + uploadedBy + '\'' +
                ", uploadedOn=" + uploadedOn +
                ", isbnNumber=" + isbnNumber +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }

}
