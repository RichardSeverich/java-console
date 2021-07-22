package org.fjala.resoft.services.resultevaluation;

import java.time.LocalDate;
import java.util.Collection;
import java.util.stream.Collectors;
import org.fjala.resoft.datatypes.ResultEvaluation;
import org.fjala.resoft.dtos.ImportDto;
import org.fjala.resoft.dtos.NewResultEvaluationDto;
import org.fjala.resoft.dtos.ResultEvaluationDto;
import org.fjala.resoft.importmodule.filemanager.FileManager;
import org.fjala.resoft.repositories.ActivityRepository;
import org.fjala.resoft.repositories.CandidateRepository;
import org.fjala.resoft.repositories.ProgramRepository;
import org.fjala.resoft.repositories.ResultEvaluationRepository;
import org.fjala.resoft.services.formaters.Formatter;
import org.fjala.resoft.services.imports.ImportService;
import org.fjala.resoft.services.mappers.ResultEvaluationDtoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ResultEvaluationServiceImpl implements ResultEvaluationService {

    @Autowired
    private ResultEvaluationRepository resultEvaluationRepository;

    @Autowired
    private ProgramRepository programRepository;

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    Formatter<NewResultEvaluationDto> formatter;

    @Autowired
    ImportService<NewResultEvaluationDto> importService;

    @Autowired
    private FileManager csvManager;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private ResultEvaluationDtoMapper resultEvaluationDtoMapper;

    @Override
    public ImportDto saveFile(MultipartFile file) {
        importService.setFileManager(csvManager);
        importService.setFormatter(formatter);
        Collection<NewResultEvaluationDto> resultEvaluations = importService.format(file);
        int saved = 0;

        Collection<ResultEvaluation> evaluations = resultEvaluations.stream()
            .filter(this::hasResultEvaluationError).map(resultEvaluation -> {
                ResultEvaluation curretResultEvaluation = new ResultEvaluation();
                curretResultEvaluation.setTitle(resultEvaluation.getTitle());
                curretResultEvaluation.setSetEvaluation(resultEvaluation.getSetEvaluation());
                curretResultEvaluation.setEmail(resultEvaluation.getEmail());
                curretResultEvaluation.setScore(Float.parseFloat(resultEvaluation.getScore()));
                curretResultEvaluation.setProgram(resultEvaluation.getProgram());
                curretResultEvaluation.setCreatedAt(LocalDate.now());
                curretResultEvaluation.setCandidate(candidateRepository.findByEmail(resultEvaluation.getEmail()).get());
                curretResultEvaluation.setActivity(activityRepository.findByName(resultEvaluation.getActivity()).get());
                return curretResultEvaluation;

            }).collect(Collectors.toList());
        resultEvaluationRepository.saveAll(evaluations);
        saved = evaluations.size();

        ImportDto result = new ImportDto();
        result.setSaved(saved);
        result.setTotal(resultEvaluations.size());
        result.setFailed(resultEvaluations.size() - saved);

        return result;
    }

    public boolean hasResultEvaluationError(NewResultEvaluationDto resultEvaluation) {

        if (candidateRepository.findByEmail(resultEvaluation.getEmail()).isEmpty()
                ||
                activityRepository.findByName(resultEvaluation.getActivity()).isEmpty()) {
            return false;
        }
        if (resultEvaluation.getTitle().isEmpty() || resultEvaluation.getProgram().isEmpty()
                ||
                resultEvaluation.getScore().isEmpty()) {
            return false;
        }

        return true;
    }

    @Override
    public Collection<ResultEvaluationDto> getResultEvaluationsByCandidate(Long id) {
        return resultEvaluationRepository.findAllByCandidateId(id)
                .stream()
                .map(result -> resultEvaluationDtoMapper.mapToResultEvaluationDto(result))
                .collect(Collectors.toList());
    }
}
