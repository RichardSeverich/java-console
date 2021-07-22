package org.fjala.resoft.services.stage;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.fjala.resoft.datatypes.Program;
import org.fjala.resoft.datatypes.Stage;
import org.fjala.resoft.dtos.EditStageDto;
import org.fjala.resoft.dtos.ImportDto;
import org.fjala.resoft.dtos.ImportStageJsonDto;
import org.fjala.resoft.dtos.StageDto;
import org.fjala.resoft.dtos.StageJsonDto;
import org.fjala.resoft.exceptions.BadRequestException;
import org.fjala.resoft.importmodule.filemanager.JsonManager;
import org.fjala.resoft.repositories.ProgramRepository;
import org.fjala.resoft.repositories.StageRepository;
import org.fjala.resoft.services.formaters.Formatter;
import org.fjala.resoft.services.imports.ImportService;
import org.fjala.resoft.services.mappers.StageDtoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class StageServiceImpl implements StageService<StageDto> {

    @Autowired
    private StageRepository stageRepository;

    @Autowired
    private ProgramRepository programRepository;

    @Autowired
    private ImportService<ImportStageJsonDto> importService;

    @Autowired
    private Formatter<ImportStageJsonDto> programStagesFormatter;

    @Autowired
    private StageDtoMapper stageDtoMapper;

    @Autowired
    private JsonManager jsonManager;

    public Iterable<Stage> saveAll(Collection<Stage> stages) {
        return stageRepository.saveAll(stages);
    }

    @Override
    public ImportDto saveFile(MultipartFile file) {
        importService.setFileManager(jsonManager);
        importService.setFormatter(programStagesFormatter);
        Collection<ImportStageJsonDto> stages = importService.format(file);
        int successfullySaved = 0;
        for (ImportStageJsonDto dto: stages) {
            Program searchedProgram = programRepository.findByName(dto.getProgram().getName());
            if (checkProgramStagesOrder(dto.getProgram().getStages(), searchedProgram)) {
                stageRepository.saveAll(dto.getProgram().getStages().stream().map(s -> {
                    Stage programStage = new Stage();
                    programStage.setName(s.getName());
                    programStage.setStageOrder(s.getOrder());
                    programStage.setProgram(searchedProgram);
                    return programStage;
                }).collect(Collectors.toList()));
                successfullySaved++;
            }
        }
        ImportDto response = new ImportDto();
        response.setSaved(successfullySaved);
        response.setFailed(stages.size() - successfullySaved);
        response.setTotal(stages.size());
        return response;
    }

    @Override
    public List<StageDto> update(List<EditStageDto> stages) {
        return stages.stream().filter(stage -> stageRepository.findById(stage.getId()).isPresent())
                .map(editStageDto -> {
                    Stage searchedStage = stageRepository.findById(editStageDto.getId()).get();
                    searchedStage.setStartDate(editStageDto.getStartDate());
                    searchedStage.setName(editStageDto.getName());
                    stageRepository.save(searchedStage);
                    return stageDtoMapper.mapToStageDto(searchedStage);
                }).collect(Collectors.toList());
    }

    private boolean checkProgramStagesOrder(Collection<StageJsonDto> stages, Program searchedProgram) {
        if (searchedProgram == null) {
            return false;
        }
        int programStagesOrderSumatory = searchedProgram.getStages().stream().mapToInt(Stage::getStageOrder).sum();
        int stagesToAddSumatory = stages.stream().mapToInt(StageJsonDto::getOrder).sum();
        int bernoullySumatory = ((stages.size() + searchedProgram.getStages().size())
                * (stages.size() + searchedProgram.getStages().size() + 1)) / 2;
        return (programStagesOrderSumatory + stagesToAddSumatory == bernoullySumatory);
    }
}
