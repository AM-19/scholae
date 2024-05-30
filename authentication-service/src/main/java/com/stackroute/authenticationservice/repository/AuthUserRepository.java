package com.stackroute.authenticationservice.repository;

import com.stackroute.authenticationservice.model.AuthUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AuthUserRepository extends JpaRepository<AuthUser,String> {

    AuthUser findByEmailIdAndPassword(String emailId, String password);
}
