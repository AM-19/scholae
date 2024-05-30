package com.stackroute.bookservice.ExceptionHandling;

public class ConversionException extends RuntimeException {
    public ConversionException(String message, Exception ex) {
        super(message, ex);
    }
}
