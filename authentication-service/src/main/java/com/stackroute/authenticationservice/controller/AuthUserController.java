package com.stackroute.authenticationservice.controller;

import com.stackroute.authenticationservice.exceptions.UserAlreadyExistException;
import com.stackroute.authenticationservice.exceptions.UserNotFoundException;
import com.stackroute.authenticationservice.model.AuthUser;
import com.stackroute.authenticationservice.service.AuthUserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
@RestController
@RequestMapping("/api/v1")
public class AuthUserController {
    @Autowired
    private AuthUserService authUserService;

    @GetMapping("/addUser")
    public ResponseEntity<?> addUser(@RequestBody AuthUser user) {
        try {
            AuthUser user1 = authUserService.createUser(user);
            return new ResponseEntity<AuthUser>(user, HttpStatus.OK);
        } catch (UserAlreadyExistException e) {
            return new ResponseEntity<String>("User Already Exists", HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> validateUser(@RequestBody AuthUser user) {
        try {
            AuthUser registerUser = authUserService.validateUser(user.getEmailId(), user.getPassword());
            String myToken = generateToken(registerUser);
           HashMap<String, String> myMap = new HashMap();
            myMap.put("token", myToken);
            return new ResponseEntity< HashMap>(myMap, HttpStatus.ACCEPTED);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<String>("Invalid User", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("data")
    public String getSensitiveData() {
        return "validationConfirmationMessage";
    }

    public String generateToken(AuthUser obj) {
        long expiry = 10_00_0000;

        return Jwts.builder().setSubject(obj.getEmailId()).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiry)).signWith(SignatureAlgorithm.HS256, "secret").compact();

    }

    @GetMapping("/password")
    public ResponseEntity<String> getCurrentPassword(@RequestParam("emailId") String emailId){
        AuthUser user = this.authUserService.getUserByEmail(emailId);
        return new ResponseEntity<String>(user.getPassword(),HttpStatus.OK);
    }

    @PutMapping("/changepassword")
    public ResponseEntity<String> changeUserPassword(@RequestBody AuthUser newDetails){
        this.authUserService.changePassword(newDetails);
        return new ResponseEntity<String>("Password Changed",HttpStatus.ACCEPTED);
    }

}
