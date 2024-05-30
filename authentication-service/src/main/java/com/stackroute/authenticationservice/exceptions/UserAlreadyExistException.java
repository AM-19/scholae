package com.stackroute.authenticationservice.exceptions;

public class UserAlreadyExistException extends  Exception {
    private String message;

    public UserAlreadyExistException(String message) {
        this.message = message;
    }

    public UserAlreadyExistException() {
    }
}
