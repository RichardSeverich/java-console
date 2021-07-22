package org.fjala.resoft.services.activity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.stream.Collectors;
import org.fjala.resoft.datatypes.Activity;
import org.fjala.resoft.datatypes.Program;
import org.fjala.resoft.datatypes.Stage;
import org.fjala.resoft.dtos.ActivityDto;
import org.fjala.resoft.dtos.ActivityJsonDto;
import org.fjala.resoft.dtos.ImportActivityJsonDto;
import org.fjala.resoft.dtos.ImportDto;
import org.fjala.resoft.importmodule.filemanager.FileManager;
import org.fjala.resoft.repositories.ActivityRepository;
import org.fjala.resoft.repositories.ProgramRepository;
import org.fjala.resoft.repositories.StageRepository;
import org.fjala.resoft.services.formaters.Formatter;
import org.fjala.resoft.services.imports.ImportService;
import org.fjala.resoft.services.mappers.ActivityDtoMapper;
import org.fjala.resoft.services.mappers.ActivityJsonDtoMapper;
import org.fjala.resoft.services.mappers.ProgramDtoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ActivityServiceImpl implements ActivityService {

    private static final String INVALID_PROGRAM = "Program with name: ";

    private static final String NOT_EXIST = " does not exist";

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private ProgramRepository programRepository;

    @Autowired
    private StageRepository stageRepository;

    @Autowired
    private ImportService<ImportActivityJsonDto> importService;

    @Autowired
    private Formatter<ImportActivityJsonDto> stageActivitiesFormatter;

    @Autowired
    private ActivityJsonDtoMapper activityJsonDtoMapper;

    @Autowired
    private ActivityDtoMapper activityDtoMapper;

    @Autowired
    private ProgramDtoMapper programDtoMapper;

    @Autowired
    private FileManager jsonManager;

    @Override
    public ImportDto saveFile(MultipartFile file) {
        importService.setFileManager(jsonManager);
        importService.setFormatter(stageActivitiesFormatter);
        int successfullySaved = 0;
        ImportActivityJsonDto programActivities = importService.format(file).iterator().next();
        Collection<ActivityJsonDto> activities = programActivities.getActivityJsonDto();
        Program searchedProgram = programRepository.findByName(programActivities.getProgramName());
        if (searchedProgram != null) {
            for (ActivityJsonDto activityDto : activities) {
                Stage stage = stageRepository.findByNameAndProgram(activityDto.getStageName(), searchedProgram);
                if (stage != null && activityRepository.findByNameAndStage(activityDto.getName(), stage) == null) {
                    Activity activity = activityJsonDtoMapper.toActivity(activityDto);
                    activity.setStage(stage);
                    activityRepository.save(activity);
                    successfullySaved++;
                }
            }
        }

        ImportDto response = new ImportDto();
        response.setTotal(activities.size());
        response.setSaved(successfullySaved);
        response.setFailed(activities.size() - successfullySaved);
        return response;
    }

    public Collection<ActivityDto> getActivitiesByProgram(Long id) {
        Collection<Activity> activities = new ArrayList<>();
        Collection<ActivityDto> response = new ArrayList<>();

        if (!programRepository.existsById(id)) {
            return response;
        }

        Collection<Stage> stages = stageRepository.findAllByProgramId(programRepository.findById(id).get().getId());

        for (Stage current : stages) {
            activities.addAll(activityRepository.findAllByStageIdOrderByDateAsc(current.getId()));
        }
        response = activities.stream()
                .map(activity -> activityDtoMapper.mapToDto(activity)).collect(Collectors.toList());
        return response;
    }
}
