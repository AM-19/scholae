package com.stackroute.userservice.mqsenderconfig;

import com.stackroute.userservice.Model.AuthUser;

public interface ISender {
    void sendMessage(String routingKey, AuthUser user);
}
