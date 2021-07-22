package org.fjala.resoft.services.activity;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import org.fjala.resoft.datatypes.*;
import org.fjala.resoft.dtos.ActivityDto;
import org.fjala.resoft.dtos.ActivityJsonDto;
import org.fjala.resoft.dtos.ImportActivityJsonDto;
import org.fjala.resoft.dtos.ImportDto;
import org.fjala.resoft.repositories.ActivityRepository;
import org.fjala.resoft.repositories.ProgramRepository;
import org.fjala.resoft.repositories.StageRepository;
import org.fjala.resoft.services.imports.ImportService;
import org.fjala.resoft.services.mappers.ActivityDtoMapper;
import org.fjala.resoft.services.mappers.ActivityJsonDtoMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

@RunWith(MockitoJUnitRunner.class)
public class ActivityServiceTest {
    @InjectMocks
    org.fjala.resoft.services.activity.ActivityServiceImpl activityService;

    @Mock
    ActivityRepository repository;

    @Mock
    StageRepository stageRepository;

    @Mock
    ProgramRepository programRepository;

    @Mock
    ImportService<ImportActivityJsonDto> importService;

    @Mock
    ActivityJsonDtoMapper activityJsonDtoMapper;

    @Mock
    ActivityDtoMapper activityDtoMapper;

    @Test
    public void testGetActivitiesByProgramWhenProgramDoesNotExist() throws ParseException {
        Activity mockActivity = new Activity();
        mockActivity.setId(1L);
        mockActivity.setName("Charla UMSS");
        mockActivity.setLocation("UMSS");
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MMM-yyyy", Locale.ENGLISH);
        String dateInString = "7-Jun-2013";
        mockActivity.setDate(formatter.parse(dateInString));
        mockActivity.setStatus(ActivityStatus.ACTIVE);

        ActivityDto expected = new ActivityDto();
        expected.setId(1L);
        expected.setName("Charla UMSS");
        expected.setLocation("UMSS");
        expected.setDate(formatter.parse(dateInString));
        expected.setStatus(ActivityStatus.ACTIVE);

        Collection<Activity> activities = new ArrayList<>();
        activities.add(mockActivity);

        assertEquals("Charla UMSS", activities.stream().findFirst().get().getName());
    }

    @Test
    public void testGetActivitiesByProgramWhenProgramExists() throws ParseException {
        Program program = new Program();
        program.setId(1L);
        program.setName("DEV-30");
        program.setProgramOrder(30);
        program.setProgramType(ProgramType.DEV);

        Stage stage = new Stage();
        stage.setId(1L);
        stage.setName("Step 1");
        stage.setStageOrder(1);

        Activity mockActivity = new Activity();
        mockActivity.setId(1L);
        mockActivity.setName("Charla UMSS");
        mockActivity.setLocation("UMSS");
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MMM-yyyy", Locale.ENGLISH);
        String dateInString = "7-Jun-2013";
        mockActivity.setDate(formatter.parse(dateInString));
        mockActivity.setStatus(ActivityStatus.ACTIVE);

        ActivityDto expected = new ActivityDto();
        expected.setId(1L);
        expected.setName("Charla UMSS");
        expected.setLocation("UMSS");
        expected.setDate(formatter.parse(dateInString));
        expected.setStatus(ActivityStatus.ACTIVE);

        Mockito.when(programRepository.existsById(1L))
                .thenReturn(true);

        Mockito.when(stageRepository.findAllByProgramId(1L))
                .thenReturn(List.of(stage));

        Mockito.when(programRepository.findById(1L))
                .thenReturn(Optional.of(program));

        Mockito.when(repository.findAllByStageIdOrderByDateAsc(1L))
                .thenReturn(List.of(mockActivity));

        Mockito.when(activityDtoMapper.mapToDto(mockActivity))
                .thenReturn(expected);

        Collection<ActivityDto> actual = activityService.getActivitiesByProgram(1L);

        assertEquals(expected.getName(), actual.stream().findFirst().get().getName());
    }

    @Test
    public void testSaveFileWhenFileAndDataAreCorrect() throws IOException, ParseException {
        File file = new File("src/test/resources/json/activitiesdata/correctActivities.json");
        FileInputStream inputStream = new FileInputStream(file);
        MockMultipartFile mockMultipartFile = new MockMultipartFile("file",
                "correctActivities.json", MediaType.APPLICATION_JSON_VALUE, inputStream);

        Program program = new Program();
        program.setId(1L);
        program.setName("DEV-30");
        program.setProgramOrder(30);
        program.setProgramType(ProgramType.DEV);

        Stage stage = new Stage();
        stage.setId(1L);
        stage.setName("Step 1");
        stage.setStageOrder(1);

        Activity mockActivity = new Activity();
        mockActivity.setId(1L);
        mockActivity.setName("Charla UMSS");
        mockActivity.setLocation("UMSS");
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MMM-yyyy", Locale.ENGLISH);
        String dateInString = "7-Jun-2013";
        mockActivity.setDate(formatter.parse(dateInString));
        mockActivity.setStatus(ActivityStatus.ACTIVE);

        ActivityJsonDto activityDto = new ActivityJsonDto();
        activityDto.setName("Charla UMSS");
        activityDto.setStatus(ActivityStatus.ACTIVE);
        activityDto.setType(ActivityType.GROUP);
        activityDto.setTime("20:20");
        activityDto.setDate(LocalDateTime.now());
        activityDto.setLocation("UMSS");
        activityDto.setStageName("Step 1");

        ImportActivityJsonDto activityJsonDto = new ImportActivityJsonDto();
        activityJsonDto.setProgramName("DEV-30");
        activityJsonDto.setActivityJsonDto(List.of(activityDto));

        ImportDto importResult = new ImportDto();
        importResult.setFailed(0);
        importResult.setTotal(1);
        importResult.setSaved(1);

        Mockito.when(importService.format(mockMultipartFile))
                .thenReturn(List.of(activityJsonDto));

        Mockito.when(programRepository.findByName("DEV-30"))
                .thenReturn(program);

        Mockito.when(stageRepository.findByNameAndProgram("Step 1",program))
                .thenReturn(stage);

        Mockito.when(repository.findByNameAndStage("Charla UMSS", stage))
                .thenReturn(null);

        Mockito.when(activityJsonDtoMapper.toActivity(activityDto))
                .thenReturn(mockActivity);

        ImportDto result = activityService.saveFile(mockMultipartFile);

        assertEquals(result.getSaved(), 1);
        assertEquals(result.getTotal(), 1);
        assertEquals(result.getFailed(), 0);
        assertNull(result.getMessage());
    }
}
