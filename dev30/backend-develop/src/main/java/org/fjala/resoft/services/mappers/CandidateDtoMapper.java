package org.fjala.resoft.services.mappers;

import org.fjala.resoft.datatypes.Candidate;
import org.fjala.resoft.dtos.CandidateDto;
import org.fjala.resoft.dtos.CandidateSearchDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CandidateDtoMapper {
    CandidateDto mapToCandidateDto(Candidate candidate);

    CandidateSearchDto mapToCandidateSearchDto(Candidate candidate);
}
