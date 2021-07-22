package org.fjala.resoft.dtos;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EditProgramDto {

    private String description;

    private Date startDate;

    private Date endDate;
}
