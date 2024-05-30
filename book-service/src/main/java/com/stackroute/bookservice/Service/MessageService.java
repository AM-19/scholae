package com.stackroute.bookservice.Service;

import com.stackroute.bookservice.Model.MqBook;

public interface MessageService {
    void sendMessage(String routingKey, MqBook mqBook);
}
