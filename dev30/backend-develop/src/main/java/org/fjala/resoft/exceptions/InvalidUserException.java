package org.fjala.resoft.exceptions;

public class InvalidUserException extends BadRequestException {

    public InvalidUserException(String message) {
        super(message);
    }
}
