package com.dark.ecommerce.exception;
/*
  Custom exception class used for handling cases
  where requested resources are not found in the system.
 */
public class ProductNotFoundException
        extends RuntimeException {

    public ProductNotFoundException(String message) {
        super(message);
    }
}