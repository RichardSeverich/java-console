package org.fjala.resoft.exceptions;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class ExceptionResponse {

    private final LocalDateTime timestamp;
    private final String message;
    private final String path;

    public ExceptionResponse(LocalDateTime timestamp, String message, String path) {
        this.timestamp = timestamp;
        this.message = message;
        this.path = path;
    }

}
