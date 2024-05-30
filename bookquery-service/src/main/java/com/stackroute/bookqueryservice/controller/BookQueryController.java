package com.stackroute.bookqueryservice.controller;

import com.stackroute.bookqueryservice.models.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class BookQueryController {

    @Autowired
    private RestTemplate restTemplate;

    List<String> nlpList=new ArrayList<>();
    String url1="http://bookservice:8095/api/v1/search/";
//    String url1="http://localhost:8080/bookservice/api/v1/search/";
    List<Book>  books=new ArrayList<>();

    @GetMapping("/bookfilter")
   public ResponseEntity<?> bookFilters(@RequestParam(value="genre",required=false) String genre, @RequestParam(value="author",required=false) String author, @RequestParam(value="bookTitle",required=false) String bookTitle)
    {
        List<String> filters=new ArrayList<>();
        filters.add(genre);filters.add(author);filters.add(bookTitle);

        if(!(filters.isEmpty()||filters==null))
        {
            List<Book>  serachQueryBooks=  restTemplate.exchange(url1+filters, HttpMethod.GET, null,new ParameterizedTypeReference<List<Book>>(){}).getBody();
           return  new ResponseEntity<List<Book>>(serachQueryBooks, HttpStatus.OK);
        }

        else{
            return new ResponseEntity<String>("error",HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/keywords/{list}")
    public ResponseEntity<?> getKeyword(@PathVariable List<String> list)
    {   
		System.out.println("\n\n\nIn BookQueryService COntroller.Received keywords : "+list);
		nlpList.addAll(list);
		System.out.println("\n\n\nGoing to call BookService.THis is what we are sending : "+nlpList);
        books=restTemplate.exchange(url1+nlpList, HttpMethod.GET, null,new ParameterizedTypeReference<List<Book>>(){}).getBody();
		System.out.println("\n\nBack in bookQuery Service.Going back in nlpservice.");
        nlpList.clear();
		return new ResponseEntity<List<Book>>(books,HttpStatus.OK);
    }
}
