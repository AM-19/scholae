package com.stackroute.bookservice.Service;

import com.stackroute.bookservice.ExceptionHandling.ConversionException;
import com.stackroute.bookservice.Model.Book;
import org.apache.tika.exception.TikaException;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.ParseContext;
import org.apache.tika.parser.pdf.PDFParser;
import org.apache.tika.sax.BodyContentHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.xml.sax.SAXException;

import javax.xml.transform.TransformerConfigurationException;
import java.io.IOException;
import java.io.InputStream;

//Service to Extract Content of Pdf using Apache Tika
@Component
public class BookContent {

    public Book contentExtractor (MultipartFile pdfFile) throws IOException, TransformerConfigurationException {
        try {
            BodyContentHandler handler = new BodyContentHandler(-1); //To make Handler limitless
            Metadata metadata = new Metadata();
            InputStream input = pdfFile.getInputStream();
            ParseContext pcontext = new ParseContext();
            PDFParser pdfparser = new PDFParser();
            pdfparser.parse(input, handler, metadata,pcontext);
            return new Book(handler.toString());
        }

        catch (IOException | SAXException | TikaException ex){
            throw new ConversionException(ex.getMessage(), ex);
        }
    }
}
