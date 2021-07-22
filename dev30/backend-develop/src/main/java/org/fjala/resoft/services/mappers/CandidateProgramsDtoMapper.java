package org.fjala.resoft.services.mappers;

import org.fjala.resoft.datatypes.CandidateStatusProgram;
import org.fjala.resoft.dtos.CandidateProgramsDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface CandidateProgramsDtoMapper {
    @Mapping(target = "program", expression = "java(candidate.getProgram().getName())")
    CandidateProgramsDto mapToCandidateProgramsDto(CandidateStatusProgram candidate);
}
