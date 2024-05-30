package com.stackroute.userservice.Service;



import com.stackroute.userservice.Model.User;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface UserService {
    User saveUser(User user) ;
    List<User> getAllUsers();
    Object getUserActions(String role) throws IOException;
    String findUserRole(String emailId);
    User  updateProfile(String id,String address,Long phoneNumber);
    Optional<User> getUser(String emailId);
}