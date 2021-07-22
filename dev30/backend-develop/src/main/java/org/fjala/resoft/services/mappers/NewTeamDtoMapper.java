package org.fjala.resoft.services.mappers;

import org.fjala.resoft.datatypes.Team;
import org.fjala.resoft.dtos.NewTeamDto;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface NewTeamDtoMapper {
    @Mapping(target = "name", source = "name")
    NewTeamDto mapTeamToDto(Team team);

    @Mapping(target = "name", source = "name")
    @InheritInverseConfiguration
    Team mapDtoToTeam(NewTeamDto newTeamDto);
}
