package com.stackroute.bookservice.Service;

import com.stackroute.bookservice.Model.MqBook;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class MessageServiceImpl implements MessageService {


    @Autowired
    RabbitTemplate rabbitTemplate;

    @Value("${spring.rabbitmq.exchange}")
    public String BOOK_DIRECT_EXCHANGE;

    @Override
    public void sendMessage(String routingKey, MqBook mqBook) {
        this.rabbitTemplate.convertAndSend(BOOK_DIRECT_EXCHANGE, routingKey, mqBook);
    }
}
