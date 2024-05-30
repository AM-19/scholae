package com.stackroute.userservice.Model;

public class AuthUser{
    private String emailId;
    private String password;

    public AuthUser(String emailId, String password) {
        this.emailId = emailId;
        this.password = password;
    }

    public AuthUser() { }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "AuthUser{" +
                "emailId='" + emailId + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}