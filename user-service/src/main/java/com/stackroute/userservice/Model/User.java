package com.stackroute.userservice.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;


@Document
public class User {

    @Id
    private String emailId;
    private long phoneNumber;
    private String address;
    private UserRole userRole;
    @Transient
    @JsonInclude(JsonInclude.Include.NON_NULL)

    private String password;

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public User(String emailId, long phoneNumber, String address, UserRole userRole, String password) {
        this.emailId = emailId;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.userRole = userRole;
        this.password = password;
    }

    public User() { }

    @Override
    public String toString() {
        return "User{" +
                "emailId='" + emailId + '\'' +
                ", phoneNumber=" + phoneNumber +
                ", address='" + address + '\'' +
                ", userRole=" + userRole +
                ", password='" + password + '\'' +
                '}';
    }
}


