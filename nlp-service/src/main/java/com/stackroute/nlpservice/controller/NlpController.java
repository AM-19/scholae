package com.stackroute.nlpservice.controller;


import com.stackroute.nlpservice.models.Book;
import com.stackroute.nlpservice.models.Type;
import edu.stanford.nlp.ling.CoreAnnotations;
import edu.stanford.nlp.ling.CoreLabel;
import edu.stanford.nlp.pipeline.CoreDocument;
import edu.stanford.nlp.pipeline.StanfordCoreNLP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value="/api/v1")
public class NlpController {

    @Autowired
    private StanfordCoreNLP stanfordCoreNLP;

    @Autowired
    private RestTemplate restTemplate;

    List<String> result=new ArrayList<>();
    String url="http://bookqueryservice:8050/api/v1/keywords/";
//    String url="http://localhost:8080/bookqueryservice/api/v1/keywords/";

    @GetMapping(value = "/filter")
    public ResponseEntity<?> nlpFilter(@RequestParam("input") final String input, @RequestParam("type") String type) {
       // String query=capitalizeWord(input);
	   System.out.println("\n\n\nIn NLP Service Controller : \nInput : "+input+"\nType : "+type);
        CoreDocument coreDocument = new CoreDocument(input);
        stanfordCoreNLP.annotate(coreDocument);
        List<CoreLabel> coreLabels = coreDocument.tokens();
        List<String> typeList = null;

        if (!(type == null || type.isEmpty())) {
            type = type.trim();
            typeList = Arrays.asList(type.split(","));
            result=collectList(coreLabels, typeList);
            System.out.println("\n\nFilter Result of NLP service(Calling BookQuery Service) : "+result);
			
            List<Book> books= restTemplate.exchange(url+result, HttpMethod.GET, null,new ParameterizedTypeReference<List<Book>>(){}).getBody();
			if(books==null || books.isEmpty()){
				System.out.println("\n\n\nBack in Nlp.Return from BookQuery Service is Null or empty");
				return new ResponseEntity<String>("No books found",HttpStatus.NOT_FOUND);
			}else{
				System.out.println("\n\n\nBack in NLP.Return from BookQuery Service (List of Books) : "+books.get(0).getAuthorName());
				return new ResponseEntity<List<Book>>(books,HttpStatus.OK);
			}
        }
        else
        {
            String error="Book not found";
            return new ResponseEntity<String>(error, HttpStatus.NOT_FOUND);
        }

    }

    private List<String> collectList(List<CoreLabel> coreLabels, List<String> type1) {
        List<Type> entity=new ArrayList<>();
        for(String w:type1)
        {
            entity.add(Type.valueOf(w));
        }
        List<String> keys=new ArrayList<>();
        for(Type t:entity){
            keys.addAll(coreLabels
                    .stream()
                    .filter(coreLabel -> t.getName().equalsIgnoreCase(coreLabel.get(CoreAnnotations.PartOfSpeechAnnotation.class)))
                    .map(CoreLabel::originalText)
                    .collect(Collectors.toList()));
        }
        return keys;}
   /* public String capitalizeWord(String str){
        String words[]=str.split("\\s");
        String capitalizeWord="";
        for(String w:words){
            String first=w.substring(0,1);
            String afterfirst=w.substring(1);
            capitalizeWord+=first.toUpperCase()+afterfirst+" ";
        }
        return capitalizeWord.trim();

    }*/
}
