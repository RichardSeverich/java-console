package org.fjala.resoft.dtos;

import java.util.Collection;
import lombok.Data;

@Data
public class ImportTeamJsonDto {
    private TeamInformationJsonDto team;
    private Collection<UserJsonDto> users;
}
