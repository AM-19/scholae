package com.stackroute.userservice.Service;

import com.stackroute.userservice.Exception.UserAlreadyExistException;
import com.stackroute.userservice.Model.User;
import com.stackroute.userservice.Repository.UserRepository;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ResourceLoader resourceLoader;

    @Override
    public User saveUser(User user)  {
        Optional<User> u=userRepository.findById(user.getEmailId());
        if(u.isPresent())
            throw new UserAlreadyExistException();
        return userRepository.save(user) ;
    }

    @Override
    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    @Override
    public String findUserRole(String emailId){
        Optional<User> result = this.userRepository.findById(emailId);
        return result.get().getUserRole().toString();
    }

    @Override
    public Object getUserActions(String role) throws IOException {
        JSONParser jsonParser = new JSONParser();
        JSONObject dataObj = new JSONObject();
        Object menuObj = new Object();
        try {
            Resource resource = resourceLoader.getResource("classpath:useraction.json");
            JSONObject obj = (JSONObject) jsonParser.parse(new BufferedReader(new InputStreamReader(resource.getInputStream())));
            JSONArray jsonArray = (JSONArray) obj.get("data");
            for (int i = 0; i < jsonArray.size(); i++) {
                dataObj = (JSONObject) jsonArray.get(i);
                if (dataObj.get("role").equals(role)) {
                    menuObj = dataObj.get("action");
                }
            }
        } catch (FileNotFoundException e) {
            System.out.println("eyude" + e.getMessage());
        } catch (IOException e) {
            System.out.println("eyude" + e.getMessage());
        } catch (ParseException e) {
            System.out.println("eyude" + e.getMessage());        }
        return menuObj;
    }

   @Override
   public User updateProfile(String emailId, String address, Long phoneNumber) {
        User updatedUser=null;
        if(address==null||address.isEmpty())
        {   User getUser=userRepository.findById(emailId).get();
        getUser.setPhoneNumber(phoneNumber);
            updatedUser=userRepository.save(getUser);

        }
        else if((phoneNumber==null))
        {
            User getUser=userRepository.findById(emailId).get();
            getUser.setAddress(address);
            updatedUser=userRepository.save(getUser);
        }
        else{   User getUser=userRepository.findById(emailId).get();
            getUser.setAddress(address);
            getUser.setPhoneNumber(phoneNumber);
            updatedUser=userRepository.save(getUser);

        }
        return updatedUser;
    }

    @Override
    public Optional<User> getUser(String emailId) {
        return userRepository.findById(emailId);
    }


}
