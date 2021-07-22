package org.fjala.resoft.services.candidate;

import java.util.Collection;
import java.util.Optional;
import org.fjala.resoft.dtos.CandidateDto;
import org.fjala.resoft.dtos.CandidateListDto;
import org.fjala.resoft.dtos.CandidateProgramsDto;
import org.fjala.resoft.dtos.CandidateSearchDto;
import org.fjala.resoft.services.common.GenericImportService;

public interface CandidateService extends GenericImportService {
    Optional<CandidateDto> get(Long id);

    Collection<CandidateSearchDto> searchCandidatesFullName(String keyWord);

    Collection<CandidateListDto> getCandidatesFullNameAscByProgram(Long id);

    Collection<CandidateProgramsDto> getCandidatePrograms(Long id);
}
