package com.stackroute.authenticationservice.service;

import com.stackroute.authenticationservice.exceptions.UserAlreadyExistException;
import com.stackroute.authenticationservice.exceptions.UserNotFoundException;
import com.stackroute.authenticationservice.model.AuthUser;

public interface AuthUserService {

    AuthUser createUser(AuthUser authUser) throws UserAlreadyExistException;
    AuthUser validateUser(String emailId, String password) throws UserNotFoundException;
    AuthUser getUserByEmail(String emailId);
    void changePassword(AuthUser newDetails);
}
