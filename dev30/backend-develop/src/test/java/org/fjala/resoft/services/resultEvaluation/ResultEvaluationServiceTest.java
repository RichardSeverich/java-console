package org.fjala.resoft.services.resultEvaluation;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import org.fjala.resoft.datatypes.Activity;
import org.fjala.resoft.datatypes.ActivityStatus;
import org.fjala.resoft.datatypes.Candidate;
import org.fjala.resoft.datatypes.CandidateCityType;
import org.fjala.resoft.datatypes.ResultEvaluation;
import org.fjala.resoft.dtos.ImportDto;
import org.fjala.resoft.dtos.NewResultEvaluationDto;
import org.fjala.resoft.dtos.ResultEvaluationDto;
import org.fjala.resoft.repositories.ActivityRepository;
import org.fjala.resoft.repositories.CandidateRepository;
import org.fjala.resoft.repositories.ResultEvaluationRepository;
import org.fjala.resoft.services.imports.ImportService;
import org.fjala.resoft.services.mappers.ResultEvaluationDtoMapper;
import org.fjala.resoft.services.mappers.ResultEvaluationDtoMapperImpl;
import org.fjala.resoft.services.resultevaluation.ResultEvaluationServiceImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.mock.web.MockMultipartFile;

@RunWith(MockitoJUnitRunner.class)
public class ResultEvaluationServiceTest {

    @InjectMocks
    ResultEvaluationServiceImpl resultEvaluationService;

    @Mock
    ResultEvaluationRepository repository;

    @Mock
    ImportService<NewResultEvaluationDto> importService;

    @Mock
    ActivityRepository activityRepository;

    @Mock
    CandidateRepository candidateRepository;

    @Spy
    ResultEvaluationDtoMapper resultEvaluationDtoMapper = new ResultEvaluationDtoMapperImpl();

    @Test
    public void testGetResultEvaluationByCandidate() {
        Activity mockActivity = new Activity();
        mockActivity.setId(1L);
        mockActivity.setName("English Evaluation");

        ResultEvaluation mockResultEvaluation = new ResultEvaluation();
        mockResultEvaluation.setId(1L);
        mockResultEvaluation.setProgram("DEV-30");
        mockResultEvaluation.setActivity(mockActivity);
        mockResultEvaluation.setSetEvaluation("Toefl test");
        mockResultEvaluation.setScore(83.00F);

        ResultEvaluationDto expected = new ResultEvaluationDto();
        expected.setId(1L);
        expected.setProgram("DEV-30");
        expected.setActivity("English Evaluation");
        expected.setSetEvaluation("Toefl test");
        expected.setScore(83.00F);

        Mockito.when(repository.findAllByCandidateId(1L)).thenReturn(Collections.singletonList(mockResultEvaluation));
        Collection<ResultEvaluationDto> actual = resultEvaluationService.getResultEvaluationsByCandidate(1L);
        assertEquals("English Evaluation", actual.stream().findFirst().get().getActivity());
    }

    @Test
    public void testGetResultEvaluationByCandidateIncorrect() {
        Mockito.when(repository.findAllByCandidateId(1L)).thenReturn(Collections.emptyList());
        Collection<ResultEvaluationDto> actual = resultEvaluationService.getResultEvaluationsByCandidate(1L);
        assertTrue(actual.isEmpty());
    }

    @Test
    public void testSaveFileOfResultEvaluationsWhenFormatAndDataAreCorrect() throws IOException, ParseException {
        File file = new File("src/test/resources/csv/resultEvaluation/resultEvaluationCorrectData.csv");
        FileInputStream inputStream = new FileInputStream(file);
        MockMultipartFile mockMultipartFile = new MockMultipartFile("file",
                "resultEvaluationCorrectData.csv", "text/csv", inputStream);

        Candidate candidate = new Candidate();
        candidate.setId(1L);
        candidate.setFirstName("Test");
        candidate.setLastName("Test");
        candidate.setBirthdate(LocalDate.parse("1996-04-08"));
        candidate.setCity(CandidateCityType.COCHABAMBA);
        candidate.setEmail("test.test@fundacion-jala.org");
        candidate.setCareer("Computer Engineering");
        candidate.setUniversity("UMSS");
        candidate.setSemester("7");

        Activity activity = new Activity();
        activity.setId(1L);
        activity.setName("Charla UMSS");
        activity.setLocation("UMSS");
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MMM-yyyy", Locale.ENGLISH);
        String dateInString = "7-Jun-2013";
        activity.setDate(formatter.parse(dateInString));
        activity.setStatus(ActivityStatus.ACTIVE);

        NewResultEvaluationDto newEvaluationResult = new NewResultEvaluationDto();
        newEvaluationResult.setTitle("First Evaluation");
        newEvaluationResult.setActivity("Charla UMSS");
        newEvaluationResult.setEmail("test.test@fundacion-jala.org");
        newEvaluationResult.setProgram("DEV-30");
        newEvaluationResult.setScore("9.9");
        newEvaluationResult.setSetEvaluation("Set Evaluations");

        Mockito.when(importService.format(mockMultipartFile))
                .thenReturn(List.of(newEvaluationResult));

        Mockito.when(activityRepository.findByName("Charla UMSS"))
                .thenReturn(Optional.of(activity));

        Mockito.when(candidateRepository.findByEmail("test.test@fundacion-jala.org"))
                .thenReturn(Optional.of(candidate));

        ImportDto actualResult = resultEvaluationService.saveFile(mockMultipartFile);

        assertEquals(actualResult.getSaved(), 1);
        assertEquals(actualResult.getTotal(), 1);
        assertEquals(actualResult.getFailed(), 0);
        assertNull(actualResult.getMessage());
    }
}