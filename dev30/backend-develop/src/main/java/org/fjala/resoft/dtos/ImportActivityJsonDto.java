package org.fjala.resoft.dtos;

import java.util.Collection;
import lombok.Data;

@Data
public class ImportActivityJsonDto {

    private String programName;

    private Collection<ActivityJsonDto> activityJsonDto;
}
