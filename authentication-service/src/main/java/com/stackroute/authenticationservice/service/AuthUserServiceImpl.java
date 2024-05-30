package com.stackroute.authenticationservice.service;

import com.stackroute.authenticationservice.exceptions.UserAlreadyExistException;
import com.stackroute.authenticationservice.exceptions.UserNotFoundException;
import com.stackroute.authenticationservice.model.AuthUser;
import com.stackroute.authenticationservice.repository.AuthUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthUserServiceImpl implements AuthUserService {

    @Autowired
    private AuthUserRepository authUserRepository;


    @Override
    public AuthUser createUser(AuthUser authUser) throws UserAlreadyExistException {
        Optional<AuthUser> userResult = authUserRepository.findById(authUser.getEmailId());

        if (userResult.isPresent()) {
            throw new UserAlreadyExistException("User Already Exists");
        }
        return authUserRepository.save(authUser);
    }

    @Override
    public AuthUser validateUser(String emailId, String password) throws UserNotFoundException {
        AuthUser authUser = authUserRepository.findByEmailIdAndPassword(emailId, password);
        if (authUser == null) {
            throw new UserNotFoundException("Invalid Id and Password");
        }
        return authUser;
    }

    @Override
    public AuthUser getUserByEmail(String emailId) {
        Optional<AuthUser> result = this.authUserRepository.findById(emailId);
        return result.get();
    }

    @Override
    public void changePassword(AuthUser newDetails) {
        this.authUserRepository.deleteById(newDetails.getEmailId());
		this.authUserRepository.save(newDetails);
	}
}
