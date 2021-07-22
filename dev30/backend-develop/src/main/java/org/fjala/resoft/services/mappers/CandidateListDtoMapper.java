package org.fjala.resoft.services.mappers;

import org.fjala.resoft.datatypes.Candidate;
import org.fjala.resoft.dtos.CandidateListDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface CandidateListDtoMapper {
    @Mapping(target = "fullName", expression = "java(candidate.getFirstName() + \" \" + candidate.getLastName())")
    CandidateListDto mapToDto(Candidate candidate);
}
