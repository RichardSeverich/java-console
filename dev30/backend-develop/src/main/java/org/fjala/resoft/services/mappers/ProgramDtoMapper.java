package org.fjala.resoft.services.mappers;

import org.fjala.resoft.datatypes.Program;
import org.fjala.resoft.dtos.ProgramDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface ProgramDtoMapper {

    @Mapping(target = "description", source = "description")
    @Mapping(target = "id", source = "id")
    ProgramDto mapProgramToDto(Program program);

    @Mapping(target = "description", source = "description")
    Program mapDtoToProgram(ProgramDto programDto);

}
