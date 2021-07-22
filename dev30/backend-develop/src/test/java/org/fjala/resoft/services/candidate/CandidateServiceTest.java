package org.fjala.resoft.services.candidate;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.File;
import java.io.FileInputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Optional;
import org.fjala.resoft.datatypes.*;
import org.fjala.resoft.dtos.ImportDto;
import org.fjala.resoft.dtos.NewCandidateDto;
import org.fjala.resoft.importmodule.filemanager.FileManager;
import org.fjala.resoft.repositories.CandidateStatusProgramRepository;
import org.fjala.resoft.repositories.ProgramRepository;
import org.fjala.resoft.searchmodule.dbsearchdriver.SearchCandidatesDB;
import org.fjala.resoft.searchmodule.searchmanager.SearchManager;
import org.fjala.resoft.datatypes.Candidate;
import org.fjala.resoft.datatypes.CandidateCityType;
import org.fjala.resoft.datatypes.CandidateStatusProgram;
import org.fjala.resoft.datatypes.CandidateStatusType;
import org.fjala.resoft.datatypes.Program;
import org.fjala.resoft.dtos.CandidateDto;
import org.fjala.resoft.dtos.CandidateProgramsDto;
import org.fjala.resoft.dtos.CandidateSearchDto;
import org.fjala.resoft.repositories.CandidateRepository;
import org.fjala.resoft.services.formaters.Formatter;
import org.fjala.resoft.services.imports.ImportService;
import org.fjala.resoft.services.mappers.CandidateDtoMapper;
import org.fjala.resoft.services.mappers.CandidateDtoMapperImpl;
import org.fjala.resoft.services.mappers.CandidateProgramsDtoMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;

import javax.validation.Validator;

@RunWith(MockitoJUnitRunner.class)
public class CandidateServiceTest {

    @InjectMocks
    CandidateServiceImpl candidateService;

    @Mock
    SearchCandidatesDB searchCandidatesDB;

    @Mock
    Formatter<NewCandidateDto> formatter;

    @Mock
    ImportService<NewCandidateDto> importService;

    @Mock
    private FileManager csvManager;

    @Mock
    private ProgramRepository programRepository;

    @Mock
    private Validator validator;

    @Mock
    private CandidateStatusProgramRepository candidateStatusProgramRepository;

    @Spy
    CandidateDtoMapper candidateDtoMapper = new CandidateDtoMapperImpl();

    @Mock
    CandidateProgramsDtoMapper candidateProgramsDtoMapper;

    @Mock
    SearchManager<CandidateSearchDto> candidateSearchManager;

    @Mock
    CandidateRepository repository;

    @Test
    public void whenSaveCandidateFileShouldReturnCandidateDTO() throws Exception {
        File file = new File("src/test/resources/csv/candidates/candidatesWithCorrectData.csv");
        FileInputStream inputStream = new FileInputStream(file);
        MockMultipartFile mockMultipartFile = new MockMultipartFile("file",
                "candidatesWithCorrectData.csv", "text/csv", inputStream);
        NewCandidateDto candidateOne = new NewCandidateDto();
        candidateOne.setFirstName("Name1");
        candidateOne.setLastName("Lastname1");
        candidateOne.setCity(CandidateCityType.COCHABAMBA);
        candidateOne.setBirthdate(LocalDate.now());
        candidateOne.setEmail("valid@email.com");
        candidateOne.setDocumentType(CandidateDocumentType.IDENTITY_CARD);
        candidateOne.setDocumentValue("12365412 CBA");
        candidateOne.setCellphone("73752584");
        candidateOne.setUniversity("UMSS");
        candidateOne.setCareer("Ing. Sistemas");
        candidateOne.setSemester("9");
        candidateOne.setWorkExperience(true);
        candidateOne.setAutodidact(true);
        candidateOne.setExtended(true);
        candidateOne.setProgram("1");
        candidateOne.setStatus(CandidateStatusType.ACTIVE);
        ArrayList<NewCandidateDto> formatterResponse = new ArrayList<NewCandidateDto>();
        formatterResponse.add(candidateOne);
        Mockito.when(importService.format(mockMultipartFile)).thenReturn(formatterResponse);
        Program searchedProgram = new Program();
        searchedProgram.setId((long) 1);
        searchedProgram.setProgramOrder(30);
        searchedProgram.setProgramType(ProgramType.DEV);
        searchedProgram.setName("DEV-30");
        Mockito.when(programRepository.findByName(Mockito.any())).thenReturn(searchedProgram);
        Candidate responseCandidate = new Candidate();
        responseCandidate.setFirstName("Name1");
        responseCandidate.setLastName("Lastname1");
        responseCandidate.setCity(CandidateCityType.COCHABAMBA);
        responseCandidate.setBirthdate(LocalDate.now());
        responseCandidate.setEmail("valid@email.com");
        responseCandidate.setDocumentType(CandidateDocumentType.IDENTITY_CARD);
        responseCandidate.setDocumentValue("12365412 CBA");
        responseCandidate.setCellphone("73752584");
        responseCandidate.setUniversity("UMSS");
        responseCandidate.setCareer("Ing. Sistemas");
        responseCandidate.setSemester("9");
        responseCandidate.setWorkExperience(true);
        responseCandidate.setAutodidact(true);
        responseCandidate.setExtended(true);
        responseCandidate.setProgram(searchedProgram);
        responseCandidate.setStatus(CandidateStatusType.ACTIVE);
        Mockito.when(repository.findFirstByDocumentValueOrEmailOrCellphone(Mockito.any(),Mockito.any(),Mockito.any()))
                .thenReturn(Optional.of(responseCandidate));
        Mockito.when(repository.findByEmail(Mockito.any())).thenReturn(Optional.of(responseCandidate));
        CandidateStatusProgram candidateStatusProgram = new CandidateStatusProgram();
        candidateStatusProgram.setId((long)1);
        candidateStatusProgram.setCandidate(responseCandidate);
        candidateStatusProgram.setDocumentValue(responseCandidate.getDocumentValue());
        candidateStatusProgram.setProgram(searchedProgram);
        candidateStatusProgram.setStatus(CandidateStatusType.ACTIVE);
        candidateStatusProgram.setCreatedAt(LocalDateTime.now());
        ArrayList<CandidateStatusProgram> candidatesStatusProgram = new ArrayList();
        candidatesStatusProgram.add(candidateStatusProgram);
        Mockito.when(candidateStatusProgramRepository.findAllByCandidateId(Mockito.any()))
                .thenReturn(candidatesStatusProgram);
        ImportDto resultDto = new ImportDto();
        resultDto.setSaved(1);
        resultDto.setTotal(1);
        resultDto.setFailed(0);
        resultDto.setDismissed(0);
        assertEquals(resultDto, candidateService.saveFile(mockMultipartFile));
    }


    @Test
    public void whenSearchCandidateReturnCandidateDto() throws Exception {
        String mockSearch = "Test";

        Candidate mockCandidate = new Candidate();
        mockCandidate.setFirstName("Test");
        mockCandidate.setLastName("Test");
        mockCandidate.setId(1L);

        CandidateSearchDto mockCandidateSearchDto = new CandidateSearchDto();
        mockCandidateSearchDto.setFirstName("Test");
        mockCandidateSearchDto.setLastName("Test");
        mockCandidateSearchDto.setId(1L);

        Mockito.when(candidateSearchManager.search(Mockito.anyString()))
                .thenReturn(Collections.singletonList(mockCandidateSearchDto));

        Collection<CandidateSearchDto> result = candidateService.searchCandidatesFullName(mockSearch);

        assertEquals("Test", result.stream().findFirst().get().getFirstName());
    }

    @Test
    public void testGetACandidateById() {
        Candidate mockCandidate = new Candidate();
        mockCandidate.setId(1L);
        mockCandidate.setFirstName("Test");
        mockCandidate.setLastName("Test");
        mockCandidate.setBirthdate(LocalDate.parse("1996-04-08"));
        mockCandidate.setCity(CandidateCityType.COCHABAMBA);
        mockCandidate.setEmail("test.test@fundacion-jala.org");
        mockCandidate.setCareer("Computer Engineering");
        mockCandidate.setUniversity("UMSS");
        mockCandidate.setSemester("7");

        CandidateDto expected = new CandidateDto();
        expected.setId(1L);
        expected.setFirstName("Test");
        expected.setLastName("Test");
        expected.setBirthdate(LocalDate.parse("1996-04-08"));
        expected.setCity(CandidateCityType.COCHABAMBA);
        expected.setEmail("test.test@fundacion-jala.org");
        expected.setCareer("Computer Engineering");
        expected.setUniversity("UMSS");
        expected.setSemester("7");

        Mockito.when(repository.findById(1L)).thenReturn(Optional.of(mockCandidate));
        Optional<CandidateDto> actual = candidateService.get(1L);
        assertEquals(expected, actual.get());
    }

    @Test
    public void testGetACandidateByIdNonExistent() {
        Mockito.when(repository.findById(1L)).thenReturn(Optional.empty());
        Optional<CandidateDto> actual = candidateService.get(1L);
        assertTrue(actual.isEmpty());
    }

    @Test
    public void testGetCandidateProgramsByIdCorrect() {
        Candidate mockCandidate = new Candidate();
        mockCandidate.setId(10L);
        mockCandidate.setDocumentValue("6452871 CBA");

        Program mockProgram = new Program();
        mockProgram.setId(2L);
        mockProgram.setName("DEV-30");

        CandidateStatusProgram mockCandidateStatusProgram = new CandidateStatusProgram();
        mockCandidateStatusProgram.setId(1L);
        mockCandidateStatusProgram.setCandidate(mockCandidate);
        mockCandidateStatusProgram.setProgram(mockProgram);
        mockCandidateStatusProgram.setStatus(CandidateStatusType.DISMISSED);

        CandidateProgramsDto expected = new CandidateProgramsDto();
        expected.setId(1L);
        expected.setProgram("DEV-30");
        expected.setStatus("DISMISSED");

        Mockito.when(repository.findById(10L)).thenReturn(Optional.of(mockCandidate));
        Mockito.when(candidateProgramsDtoMapper.mapToCandidateProgramsDto(mockCandidateStatusProgram))
                .thenReturn(expected);
        Mockito.when(candidateStatusProgramRepository.findAllByDocumentValue(mockCandidate.getDocumentValue()))
                .thenReturn(Collections.singletonList(mockCandidateStatusProgram));
        Collection<CandidateProgramsDto> result = candidateService.getCandidatePrograms(mockCandidate.getId());
        assertEquals(expected.getProgram(), result.stream().findFirst().get().getProgram());
        assertEquals(expected.getStatus(), result.stream().findFirst().get().getStatus());
    }

    @Test
    public void testGetCandidateProgramsByCandidateIncorrect() {
        Mockito.when(repository.findById(100L)).thenReturn(Optional.empty());
        Collection<CandidateProgramsDto> result = candidateService.getCandidatePrograms(100L);
        assertTrue(result.isEmpty());
    }
}
