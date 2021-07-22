package org.fjala.resoft.dtos;

import java.util.Collection;
import lombok.Data;

@Data
public class ProgramInformationJsonDto {
    private String name;
    private Collection<StageJsonDto> stages;
}
