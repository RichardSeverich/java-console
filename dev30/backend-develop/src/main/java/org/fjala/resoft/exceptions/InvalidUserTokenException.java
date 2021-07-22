package org.fjala.resoft.exceptions;

public class InvalidUserTokenException extends ForbiddenRequestException {
    public InvalidUserTokenException(String message) {
        super(message);
    }
}
