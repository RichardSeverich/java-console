package org.fjala.resoft.exceptions;

import java.io.Serializable;

public class ForbiddenRequestException extends RuntimeException implements Serializable {

    public ForbiddenRequestException(String message) {
        super(message);
    }
}
