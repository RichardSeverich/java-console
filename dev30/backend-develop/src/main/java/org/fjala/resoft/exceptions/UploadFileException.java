package org.fjala.resoft.exceptions;

public class UploadFileException extends BadRequestException {
    public UploadFileException(Exception exception, final String message) {
        super(message);
    }
}
