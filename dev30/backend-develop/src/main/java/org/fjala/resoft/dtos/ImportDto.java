package org.fjala.resoft.dtos;

import lombok.Data;

@Data
public class ImportDto {

    private String message;

    private int total;

    private int saved;

    private int failed;

    private int dismissed;
}
