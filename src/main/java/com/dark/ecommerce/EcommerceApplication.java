package com.dark.ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EcommerceApplication {

	/*
	  Main entry point of the Spring Boot application.
	  This class starts the embedded server, initializes Spring context,
	  scans components, and bootstraps the entire e-commerce backend.
	 */
	public static void main(String[] args) {
		SpringApplication.run(EcommerceApplication.class, args);
	}

}
