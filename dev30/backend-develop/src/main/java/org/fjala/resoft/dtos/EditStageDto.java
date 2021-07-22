package org.fjala.resoft.dtos;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class EditStageDto {

    private Long id;

    private String name;

    private LocalDate startDate;
}
