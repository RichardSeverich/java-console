package org.fjala.resoft.services.mappers;

import org.fjala.resoft.datatypes.Program;
import org.fjala.resoft.dtos.NewProgramDto;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface NewProgramDtoMapper {

    @Mapping(target = "description", source = "description")
    NewProgramDto mapProgramToDto(Program program);

    @Mapping(target = "description", source = "description")
    @InheritInverseConfiguration
    Program mapDtoToProgram(NewProgramDto newProgramDto);
}
