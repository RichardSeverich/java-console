package org.fjala.resoft.exceptions;

public class InvalidJsonFormatException extends BadRequestException {
    public InvalidJsonFormatException(Exception exception, String message) {
        super(message);
    }
}
