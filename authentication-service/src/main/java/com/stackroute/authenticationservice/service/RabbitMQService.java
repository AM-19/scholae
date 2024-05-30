package com.stackroute.authenticationservice.service;

import com.stackroute.authenticationservice.exceptions.UserAlreadyExistException;
import com.stackroute.authenticationservice.model.AuthUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.annotation.RabbitListenerConfigurer;
import org.springframework.amqp.rabbit.listener.RabbitListenerEndpointRegistrar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQService implements RabbitListenerConfigurer {

    private static final Logger logger = LoggerFactory.getLogger(RabbitMQService.class);
    private AuthUserService authUserService;

    @Autowired
    public RabbitMQService(AuthUserService authUserService) {
        this.authUserService = authUserService;
    }

    @RabbitListener(queues = "${spring.rabbitmq.queue}")
    public void receivedMessage(AuthUser user) {
        try {
            authUserService.createUser(user);
        } catch(UserAlreadyExistException e){

        }
//        logger.info("Received User Details : "+user);
    }
    @Override
    public void configureRabbitListeners(RabbitListenerEndpointRegistrar rabbitListenerEndpointRegistrar) {

    }
}
