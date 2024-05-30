package com.stackroute.bookrecommendationservice.service;

import com.stackroute.bookrecommendationservice.model.Book;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.annotation.RabbitListenerConfigurer;
import org.springframework.amqp.rabbit.listener.RabbitListenerEndpointRegistrar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.stackroute.bookrecommendationservice.service.RecommendationService;

@Component
public class RabbitMQService implements RabbitListenerConfigurer {

    private static final Logger logger = LoggerFactory.getLogger(RabbitMQService.class);
    private RecommendationService recommendationService;

    @Autowired
    public RabbitMQService(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @RabbitListener(queues = "${spring.rabbitmq.queue}")
    public void receivedMessage(Book book) {
        recommendationService.createBookNode(book);
//        logger.info("Received Book Details : "+book);
        }
    @Override
    public void configureRabbitListeners(RabbitListenerEndpointRegistrar rabbitListenerEndpointRegistrar) {
    }
}
