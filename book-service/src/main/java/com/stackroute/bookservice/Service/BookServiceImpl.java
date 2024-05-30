package com.stackroute.bookservice.Service;



import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.stackroute.bookservice.Model.Book;
import com.stackroute.bookservice.Model.BookNotes;
import com.stackroute.bookservice.Model.Note;
import com.stackroute.bookservice.Repository.BookRepo;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.SimpleQueryStringBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

import static com.stackroute.bookservice.Util.Constant.INDEX;
import static com.stackroute.bookservice.Util.Constant.TYPE;

@Service
public class BookServiceImpl implements BookService {
    private RestHighLevelClient client;
    private ObjectMapper objectMapper;
    private BookRepo bookRepo;

    @Autowired
    public BookServiceImpl(RestHighLevelClient client, ObjectMapper objectMapper, BookRepo bookRepo) {
        this.client = client;
        this.objectMapper = objectMapper;
        this.bookRepo = bookRepo;
    }

    //To index book in ElasticSearch
    @Override
    public String saveDocumentInput(Book book) throws Exception{
        IndexRequest indexRequest = new IndexRequest(INDEX, TYPE, book.getBookTitle())
                .source(convertProfileDocumentToMap(book), XContentType.JSON);

        IndexResponse indexResponse = client.index(indexRequest, RequestOptions.DEFAULT);
        return indexResponse.getResult().name();

    }
    private Map<String, Object> convertProfileDocumentToMap(Book book) {
        return objectMapper.convertValue(book, Map.class);
    }

    @Override
    public List<Book> findBook(String text) {
		System.out.println("\n\n\nInside findBook() in book service. THis is what we have recieved : "+text);
        try {
            SearchRequest request = new SearchRequest(INDEX);
            SearchSourceBuilder scb = new SearchSourceBuilder();
            SimpleQueryStringBuilder mcb =
                    QueryBuilders.simpleQueryStringQuery(text);
            scb.query(mcb);
            request.source(scb);

            SearchResponse response =
                    client.search(request, RequestOptions.DEFAULT);
            SearchHits hits = response.getHits();
            SearchHit[] searchHits = hits.getHits();
            List<Book> books = new ArrayList(searchHits.length);
            for(SearchHit hit : searchHits){
                String sourceAsString = hit.getSourceAsString();
                if (sourceAsString != null) {
                    Gson gson = new Gson();
                    books.add(gson.fromJson(sourceAsString, Book.class));
                }
            }
			System.out.println("\n\nAt the end of findBook() in bookservice : Number of books found - "+books.size());
            return books;
        } catch (IOException ex) {
            System.out.println("Error");
        }
        return Collections.emptyList();
    }

    @Override
    public String contentForAudio(String bookTitle) {

        try {
            SearchRequest request = new SearchRequest(INDEX);
            SearchSourceBuilder scb = new SearchSourceBuilder();
            SimpleQueryStringBuilder mcb =
                    QueryBuilders.simpleQueryStringQuery(bookTitle);
            scb.query(mcb);
            request.source(scb);

            SearchResponse response =
                    client.search(request, RequestOptions.DEFAULT);
            SearchHits hits = response.getHits();
            SearchHit[] searchHits = hits.getHits();

            List<Book> books = new ArrayList(searchHits.length);
            for(SearchHit hit : searchHits){
                String sourceAsString = hit.getSourceAsString();
                if (sourceAsString != null) {
                    Gson gson = new Gson();
                    books.add(gson.fromJson(sourceAsString, Book.class));
                }
            }
            return books.get(0).getBookContent();
        } catch (IOException ex) {
            System.out.println("Error");
        }
        return "Book Not Found";
    }

    @Override
    public void deleteBook(String bookTitle) throws IOException {
        DeleteRequest deleteRequest = new DeleteRequest(INDEX);
        deleteRequest.id(bookTitle);
        DeleteResponse deleteResponse = client.delete(deleteRequest,RequestOptions.DEFAULT);
    }


    @Override
    public List<Note> getAllNotes(String bookTitle, String userEmail){
        Optional<BookNotes> bookNotes = bookRepo.findById(bookTitle);
        if(bookNotes.isPresent())
        {
            List<Note> notes = bookNotes.get().getNotes();

            if (notes==null||notes.isEmpty())
            {
                return Collections.emptyList();
            }
            else {
                List<Note> note = new ArrayList<>();
                for (int i =0;i<notes.size();i++)
                {
                    if(notes.get(i).getUserEmail().equals(userEmail)){
                        note.add(notes.get(i));
                    }
                }
                return note;
            }
        }
        else
            return Collections.emptyList();
    }

    @Override
    public Optional<BookNotes> getBookNote(String bookTitle) {
        return bookRepo.findById(bookTitle);
    }

    @Override
    public void save(BookNotes bookNotes) {
       bookRepo.save(bookNotes);
    }

}