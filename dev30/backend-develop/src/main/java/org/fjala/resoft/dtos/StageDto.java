package org.fjala.resoft.dtos;

import java.time.LocalDate;
import lombok.Data;

@Data
public class StageDto {
    private Long id;
    private Integer order;
    private String name;
    private LocalDate startDate;
}
