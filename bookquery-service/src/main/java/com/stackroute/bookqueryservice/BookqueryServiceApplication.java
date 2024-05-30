package com.stackroute.bookqueryservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;


@EnableEurekaClient
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class BookqueryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookqueryServiceApplication.class, args);
	}
	@Bean
	public RestTemplate getRestTemplate()
	{
		return  new RestTemplate();
	}

}
