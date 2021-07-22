package org.fjala.resoft.services.formaters;

import java.util.Collection;
import java.util.stream.Collectors;
import org.fjala.resoft.dtos.ImportTeamJsonDto;
import org.fjala.resoft.dtos.TeamInformationJsonDto;
import org.fjala.resoft.dtos.UserJsonDto;
import org.fjala.resoft.exceptions.InvalidJsonFormatException;
import org.fjala.resoft.importmodule.filemanager.Record;
import org.springframework.stereotype.Component;

@Component
public class TeamUserFormatter implements Formatter<ImportTeamJsonDto> {
    private static final String TEAM = "team";
    private static final String USERS = "users";
    private static final String INVALID_JSON_FORMAT = "Make sure that your file has the correct format";

    @Override
    public Collection<ImportTeamJsonDto> parse(Collection<Record> records) {
        try {
            return records.stream().map(record -> {
                ImportTeamJsonDto importTeamJsonDto = new ImportTeamJsonDto();
                TeamInformationJsonDto teamInfo = record.getValue(TEAM, TeamInformationJsonDto.class);
                importTeamJsonDto.setTeam(teamInfo);
                importTeamJsonDto.setUsers(record.getValuesAsList(USERS, UserJsonDto.class));
                return importTeamJsonDto;
            }).collect(Collectors.toList());
        } catch (NullPointerException | IllegalArgumentException exception) {
            throw new InvalidJsonFormatException(exception, INVALID_JSON_FORMAT);
        }
    }
}
