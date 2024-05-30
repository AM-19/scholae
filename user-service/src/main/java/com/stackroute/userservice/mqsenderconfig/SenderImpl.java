package com.stackroute.userservice.mqsenderconfig;

import com.stackroute.userservice.Model.AuthUser;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SenderImpl implements ISender {
    @Autowired
    RabbitTemplate rabbitTemplate;

    @Value("${spring.rabbitmq.exchange}")
    public String USER_DIRECT_EXCHANGE;

    @Override
    public void sendMessage(String routingKey, AuthUser user) {
        this.rabbitTemplate.convertAndSend(USER_DIRECT_EXCHANGE, routingKey, user);
    }

}
