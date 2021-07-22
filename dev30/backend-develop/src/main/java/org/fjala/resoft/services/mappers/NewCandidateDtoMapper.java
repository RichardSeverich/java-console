package org.fjala.resoft.services.mappers;

import org.fjala.resoft.datatypes.Candidate;
import org.fjala.resoft.dtos.NewCandidateDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface NewCandidateDtoMapper {

    @Mappings({
            @Mapping(target = "program", expression = "java(candidate.getProgram().getName())")
    })
    NewCandidateDto newCandidateDto(Candidate candidate);
}
