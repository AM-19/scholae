package com.stackroute.userservice.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class UserAlreadyExistException extends RuntimeException {
    private  String message;

    public UserAlreadyExistException(String message){
        super();
        this.message=message;
    }
    public UserAlreadyExistException(){}

}
