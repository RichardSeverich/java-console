package org.fjala.resoft.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.fjala.resoft.datatypes.ProgramType;

@Data
@NoArgsConstructor
public class NewProgramDto {

    private int programOrder;

    private ProgramType programType;

    private String description;
}
