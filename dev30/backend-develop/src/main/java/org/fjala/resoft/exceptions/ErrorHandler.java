package org.fjala.resoft.exceptions;

import com.fasterxml.jackson.databind.JsonMappingException;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

@ControllerAdvice
public class ErrorHandler {

    @ExceptionHandler(BadRequestException.class)
    public final ResponseEntity<Object> handleBadRequestException(Exception exception, WebRequest webRequest) {
        ExceptionResponse response = new ExceptionResponse(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS),
                exception.getMessage(), webRequest.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(JsonMappingException.class)
    public final ResponseEntity<Object> handleJsonMappingException(Exception exception, WebRequest webRequest) {
        ExceptionResponse response = new ExceptionResponse(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS),
                "Invalid file format", webRequest.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<Object> handleMaxSizeException(MaxUploadSizeExceededException exception,
                                                         WebRequest webRequest) {
        ExceptionResponse response = new ExceptionResponse(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS),
                "file must be a size less than 100 MB", webRequest.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ForbiddenRequestException.class)
    public ResponseEntity<Object> handleInvalidTokenException(Exception exception, WebRequest webRequest) {
        ExceptionResponse response = new ExceptionResponse(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS),
                exception.getMessage(), webRequest.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<Object> handleNotFoundException(Exception exception, WebRequest webRequest) {
        ExceptionResponse response = new ExceptionResponse(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS),
                exception.getMessage(), webRequest.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}
