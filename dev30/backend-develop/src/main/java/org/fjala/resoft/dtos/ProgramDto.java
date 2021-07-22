package org.fjala.resoft.dtos;

import java.time.LocalDate;
import java.util.Date;
import lombok.Data;
import org.fjala.resoft.datatypes.ProgramType;

@Data
public class ProgramDto {

    private Long id;

    private int programOrder;

    private ProgramType programType;

    private String description;

    private Date createdAt;

    private LocalDate startDate;

    private LocalDate endDate;

    private boolean startAutomatically;
}
