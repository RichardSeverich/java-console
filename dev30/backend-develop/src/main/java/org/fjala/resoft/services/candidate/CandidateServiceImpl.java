package org.fjala.resoft.services.candidate;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.validation.Validator;
import org.fjala.resoft.datatypes.Candidate;
import org.fjala.resoft.datatypes.CandidateStatusProgram;
import org.fjala.resoft.datatypes.CandidateStatusType;
import org.fjala.resoft.datatypes.Program;
import org.fjala.resoft.dtos.CandidateDto;
import org.fjala.resoft.dtos.CandidateListDto;
import org.fjala.resoft.dtos.CandidateProgramsDto;
import org.fjala.resoft.dtos.CandidateSearchDto;
import org.fjala.resoft.dtos.ImportDto;
import org.fjala.resoft.dtos.NewCandidateDto;
import org.fjala.resoft.importmodule.filemanager.FileManager;
import org.fjala.resoft.repositories.CandidateRepository;
import org.fjala.resoft.repositories.CandidateStatusProgramRepository;
import org.fjala.resoft.repositories.ProgramRepository;
import org.fjala.resoft.searchmodule.searchmanager.SearchManager;
import org.fjala.resoft.services.formaters.Formatter;
import org.fjala.resoft.services.imports.ImportService;
import org.fjala.resoft.services.mappers.CandidateDtoMapper;
import org.fjala.resoft.services.mappers.CandidateListDtoMapper;
import org.fjala.resoft.services.mappers.CandidateProgramsDtoMapper;
import org.fjala.resoft.services.mappers.NewCandidateDtoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CandidateServiceImpl implements CandidateService {

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private ProgramRepository programRepository;

    @Autowired
    private CandidateStatusProgramRepository candidateStatusProgramRepository;

    @Autowired
    private NewCandidateDtoMapper newCandidateDtoMapper;

    @Autowired
    private CandidateDtoMapper candidateDtoMapper;

    @Autowired
    private CandidateProgramsDtoMapper candidateProgramsDtoMapper;

    @Autowired
    private Validator validator;

    @Autowired
    Formatter<NewCandidateDto> formatter;

    @Autowired
    ImportService<NewCandidateDto> importService;

    @Autowired
    private FileManager csvManager;

    @Autowired
    private SearchManager<CandidateSearchDto> searchManager;

    @Autowired
    private CandidateListDtoMapper candidateListDtoMapper;

    private static final String ACTIVE = "ACTIVE";

    private static final String DISMISSED = "DISMISSED";

    @Override
    public ImportDto saveFile(MultipartFile file) {
        importService.setFileManager(csvManager);
        importService.setFormatter(formatter);
        Collection<NewCandidateDto> candidates = importService.format(file);
        int saved = 0;
        int dismissed = 0;
        for (NewCandidateDto candidate : candidates) {
            Program searchedProgram = programRepository.findByName(candidate.getProgram());
            if (searchedProgram == null) {
                continue;
            }
            if (isCreatedCandidate(candidate)) {
                Candidate currentCandidate = new Candidate();
                currentCandidate.setProgram(searchedProgram);
                currentCandidate.setFirstName(candidate.getFirstName());
                currentCandidate.setLastName(candidate.getLastName());
                currentCandidate.setFullName(candidate.getFullName());
                currentCandidate.setCity(candidate.getCity());
                currentCandidate.setBirthdate(candidate.getBirthdate());
                currentCandidate.setDocumentType(candidate.getDocumentType());
                currentCandidate.setDocumentValue(candidate.getDocumentValue());
                currentCandidate.setEmail(candidate.getEmail());
                currentCandidate.setCellphone(candidate.getCellphone());
                currentCandidate.setUniversity(candidate.getUniversity());
                currentCandidate.setSemester(candidate.getSemester());
                currentCandidate.setCareer(candidate.getCareer());
                currentCandidate.setWorkExperience(candidate.isWorkExperience());
                currentCandidate.setAutodidact(candidate.isAutodidact());
                currentCandidate.setExtended(candidate.isExtended());
                currentCandidate.setCreatedAt(LocalDateTime.now());
                currentCandidate.setStatus(candidate.getStatus());

                candidateRepository.save(currentCandidate);
                relationCandidateProgram(candidate, searchedProgram);
                saved++;
                continue;
            }
            if (isCreatedRelationProgram(candidate)) {
                relationCandidateProgram(candidate, searchedProgram);
                dismissed++;
            }
        }
        ImportDto result = new ImportDto();
        result.setSaved(saved);
        result.setTotal(candidates.size());
        result.setFailed(candidates.size() - saved - dismissed);
        result.setDismissed(dismissed);
        return result;
    }

    @Override
    public Optional<CandidateDto> get(Long id) {
        return candidateRepository.findById(id).map(candidateDtoMapper::mapToCandidateDto);
    }

    private boolean candidateHasError(NewCandidateDto newCandidateDto) {
        var constraintViolations = validator.validate(newCandidateDto);
        return constraintViolations.isEmpty();
    }

    @Override
    public Collection<CandidateSearchDto> searchCandidatesFullName(String keyWord) {
        return searchManager.search(keyWord);
    }

    @Override
    public Collection<CandidateListDto> getCandidatesFullNameAscByProgram(Long id) {
        return candidateRepository.findAllByProgramIdOrderByFirstNameAscLastNameAsc(id)
                .stream().map(candidate -> candidateListDtoMapper.mapToDto(candidate))
                .collect(Collectors.toList());
    }

    @Override
    public Collection<CandidateProgramsDto> getCandidatePrograms(Long id) {
        Optional<Candidate> searchCandidates = candidateRepository.findById(id);
        if (searchCandidates.isEmpty()) {
            return Collections.emptyList();
        }

        return candidateStatusProgramRepository.findAllByDocumentValue(searchCandidates.get().getDocumentValue())
                .stream()
                .map(candidate -> candidateProgramsDtoMapper.mapToCandidateProgramsDto(candidate))
                .collect(Collectors.toList());
    }

    private boolean isCreatedCandidate(NewCandidateDto candidate) {
        return !isValidProfile(candidate) && candidateHasError(candidate);
    }

    private boolean isCreatedRelationProgram(NewCandidateDto newCandidateDto) {
        Candidate candidate = getCandidate(newCandidateDto);

        Collection<CandidateStatusProgram> candidateStatus =
                candidateStatusProgramRepository.findAllByCandidateId(candidate.getId());

        List<CandidateStatusProgram> program = candidateStatus.stream()
                .filter(candidateStatusProgram -> candidateStatusProgram.getProgram().getName()
                        .equals(newCandidateDto.getProgram())).collect(Collectors.toList());

        return isValidProfile(newCandidateDto)
                && candidateHasError(newCandidateDto)
                && program.isEmpty();
    }

    private void relationCandidateProgram(NewCandidateDto newCandidateDto, Program program) {
        Candidate candidateExist = candidateRepository
                .findFirstByDocumentValueOrEmailOrCellphone(newCandidateDto.getDocumentValue(),
                        newCandidateDto.getEmail(), newCandidateDto.getCellphone()).get();

        Candidate candidate = getCandidate(newCandidateDto);

        CandidateStatusProgram candidateStatusProgram = new CandidateStatusProgram();
        candidateStatusProgram.setCandidate(candidate);
        candidateStatusProgram.setProgram(program);
        candidateStatusProgram.setStatus(CandidateStatusType.getValueOf(getStatus(candidateExist)));
        candidateStatusProgram.setCreatedAt(LocalDateTime.now());
        candidateStatusProgram.setDocumentValue(candidate.getDocumentValue());
        candidateStatusProgramRepository.save(candidateStatusProgram);
    }

    private String getStatus(Candidate candidate) {
        Collection<CandidateStatusProgram> candidateStatus = candidateStatusProgramRepository
                .findAllByCandidateId(candidate.getId());

        List<CandidateStatusProgram> status = candidateStatus.stream()
                .filter(candidateStatusProgram -> candidateStatusProgram.getStatus()
                        .toString().equals(ACTIVE)).collect(Collectors.toList());

        return status.isEmpty() ? ACTIVE : DISMISSED;
    }

    private Candidate getCandidate(NewCandidateDto newCandidateDto) {
        return candidateRepository.findByEmail(newCandidateDto.getEmail()).get();
    }

    private Boolean isValidProfile(NewCandidateDto candidate) {
        return candidateRepository.existsByEmail(candidate.getEmail())
                && candidateRepository.existsByDocumentValue(candidate.getDocumentValue())
                && candidateRepository.existsByCellphone(candidate.getCellphone());
    }
}
