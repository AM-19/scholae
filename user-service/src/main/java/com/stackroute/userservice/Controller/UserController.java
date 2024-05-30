package com.stackroute.userservice.Controller;

import com.stackroute.userservice.Model.AuthUser;
import com.stackroute.userservice.Exception.UserAlreadyExistException;
import com.stackroute.userservice.Model.User;
import com.stackroute.userservice.Model.UserRole;
import com.stackroute.userservice.Service.UserService;
import com.stackroute.userservice.mqsenderconfig.ISender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = "/api/v1")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ISender iSender;

    @Value("${spring.rabbitmq.routingkey}")
    private String USER_ROUTING_KEY;

    @Value("${app.message}")
    private String message;

    @PostMapping("/user")
    public ResponseEntity<?> saveUser(@RequestBody User user) {
        try {
            if(user.getEmailId().split("@")[1].equals("kidsjoyment.com")){
                System.out.println("In if part : "+user.getEmailId().split("@")[1]);
                user.setUserRole(UserRole.ADMIN);
            }
            else{
                user.setUserRole(UserRole.LEARNER);
            }
//            System.out.println("\n\n\n\nUser body: "+user);
            User savedUser = userService.saveUser(user);
            AuthUser authUser = new AuthUser();
            authUser.setEmailId(user.getEmailId());
            authUser.setPassword(user.getPassword());
            iSender.sendMessage(USER_ROUTING_KEY, authUser);
            return new ResponseEntity<User>(savedUser, HttpStatus.CREATED);
        }
        catch (UserAlreadyExistException e)
        {
            return new ResponseEntity<String>("User Already Exist",HttpStatus.CONFLICT);
        }
        catch (Exception e){
            return new ResponseEntity<String>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(){
        return new ResponseEntity<List<User>>(userService.getAllUsers(),HttpStatus.FOUND);
    }

    @GetMapping("/actions")
    public Object getUserActions(@RequestParam(value="emailId") String emailId) throws IOException {
        String userRole = this.userService.findUserRole(emailId);
        return new ResponseEntity<Object>(this.userService.getUserActions(userRole),HttpStatus.OK);
    }

    @PutMapping("/updatedetails")
    public ResponseEntity<User> updateUserDetails(@RequestBody User user){
        User updatedUser = userService.updateProfile(user.getEmailId(),user.getAddress(),user.getPhoneNumber());
        return new ResponseEntity<User>(updatedUser, HttpStatus.ACCEPTED);
    }

    @GetMapping("/getUser")
    public ResponseEntity<User> getUser(@RequestParam("emailId") String emailId){

        if(userService.getUser(emailId).isPresent())
            return new ResponseEntity<User>(userService.getUser(emailId).get(),HttpStatus.OK);
        else
            return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
    }


}
