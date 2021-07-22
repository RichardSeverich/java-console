package org.fjala.resoft.services.program;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.TimeZone;
import org.fjala.resoft.datatypes.Program;
import org.fjala.resoft.datatypes.ProgramType;
import org.fjala.resoft.dtos.EditProgramDto;
import org.fjala.resoft.dtos.ImportDto;
import org.fjala.resoft.dtos.NewProgramDto;
import org.fjala.resoft.dtos.ProgramDto;
import org.fjala.resoft.exceptions.BadRequestException;
import org.fjala.resoft.services.imports.ImportService;
import org.fjala.resoft.services.mappers.NewProgramDtoMapper;
import org.fjala.resoft.services.mappers.ProgramDtoMapper;
import org.fjala.resoft.repositories.ProgramRepository;
import org.fjala.resoft.utils.datecomparator.DateComparator;
import org.fjala.resoft.utils.entitymerger.EntityMerger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.mock.web.MockMultipartFile;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThrows;

@RunWith(MockitoJUnitRunner.class)
public class ProgramServiceTest {

    private static final String INVALID_START_DATE = "Start date must be lower than the end date";

    private static final String EMPTY_START_DATE = "Please set a start date for the program";

    private static final String INVALID_END_DATE = "End date must be higher that the start date";

    @InjectMocks
    private ProgramServiceImpl programService;

    @Mock
    private EntityMerger entityMerger;

    @Mock
    ProgramRepository programRepository;

    @Mock
    ProgramDtoMapper programDTOMapper;

    @Mock
    NewProgramDtoMapper newProgramDTOMapper;

    @Mock
    ImportService<Program> importService;

    @Mock
    DateComparator dateComparator;

    @Test
    public void whenSaveNewProgramDTOThenShouldReturnProgramDTO() throws Exception {

        NewProgramDto newProgramDTO = new NewProgramDto();
        newProgramDTO.setDescription("Test description");
        newProgramDTO.setProgramType(ProgramType.DEV);
        newProgramDTO.setProgramOrder(30);

        Program programResponse = new Program();
        programResponse.setId(1L);
        programResponse.setDescription("Test description");
        programResponse.setProgramType(ProgramType.DEV);
        programResponse.setProgramOrder(30);

        Program programRequest = new Program();
        programRequest.setDescription("Test description");
        programRequest.setProgramType(ProgramType.DEV);
        programRequest.setProgramOrder(30);

        ProgramDto programDTO = new ProgramDto();
        programDTO.setId(1L);
        programDTO.setDescription("Test description");
        programDTO.setProgramType(ProgramType.DEV);
        programDTO.setProgramOrder(30);

        Mockito.when(programDTOMapper.mapProgramToDto(programResponse))
                .thenReturn(programDTO);

        Mockito.when(programRepository.save(newProgramDTOMapper.mapDtoToProgram(newProgramDTO)))
                .thenReturn(programResponse);

        ProgramDto programDtoExpected = programService.save(newProgramDTO);

        assertEquals(programDtoExpected.getProgramType(), ProgramType.DEV);
    }

    @Test
    public void whenFindProgramThenShouldReturnAProgram() throws Exception {

        Program program = new Program();
        program.setId(1L);
        program.setDescription("Test description");
        program.setProgramType(ProgramType.DEV);
        program.setProgramOrder(30);

        Program programResponse = new Program();
        programResponse.setId(1L);
        programResponse.setDescription("Test description");
        programResponse.setProgramType(ProgramType.DEV);
        programResponse.setProgramOrder(30);

        ProgramDto programDTO = new ProgramDto();
        programDTO.setId(1L);
        programDTO.setDescription("Test description");
        programDTO.setProgramType(ProgramType.DEV);
        programDTO.setProgramOrder(30);

        Mockito.when(programRepository.findById(1L))
                .thenReturn(Optional.of(program));

        Optional<Program> programResult = programRepository.findById(1L);

        assertEquals("Test description", programResult.get().getDescription());
        assertEquals(ProgramType.DEV, programResult.get().getProgramType());
        assertEquals(30, programResult.get().getProgramOrder());
    }

    @Test
    public void whenSaveProgramThenShouldReturnListOfProgramDTO() throws Exception {

        Program program = new Program();
        program.setId(1L);
        program.setDescription("Test description");
        program.setProgramType(ProgramType.DEV);
        program.setProgramOrder(30);

        Program program2 = new Program();
        program.setId(2L);
        program.setDescription("Test description 2");
        program.setProgramType(ProgramType.AT);
        program.setProgramOrder(15);

        Program program3 = new Program();
        program.setId(3L);
        program.setDescription("Test description 3");
        program.setProgramType(ProgramType.MT);
        program.setProgramOrder(10);

        List<Program> list = Arrays.asList(program, program2, program3);

        Mockito.when(programRepository.findAll())
                .thenReturn(list);

        Collection<ProgramDto> programResult = programService.getAll();

        assertEquals(3, programResult.size());
    }

    @Test
    public void testSaveFileWithValidFormatAndData() throws IOException {
        File file = new File("src/test/resources/csv/programs/correctPrograms.csv");
        FileInputStream inputStream = new FileInputStream(file);
        MockMultipartFile mockMultipartFile = new MockMultipartFile("file",
                "correctPrograms.csv", "text/csv", inputStream);

        Program program = new Program();
        program.setDescription("New description");
        program.setProgramType(ProgramType.DEV);
        program.setProgramOrder(30);

        ImportDto importResult = new ImportDto();
        importResult.setFailed(0);
        importResult.setTotal(1);
        importResult.setSaved(1);

        Mockito.when(importService.format(mockMultipartFile))
                .thenReturn(List.of(program));

        ImportDto result = programService.saveFile(mockMultipartFile);

        assertEquals(result.getSaved(), 1);
        assertEquals(result.getTotal(), 1);
        assertEquals(result.getFailed(), 0);
        assertNull(result.getMessage());
    }

    @Test
    public void testUpdateDescriptionOnExistedProgramSuccessfully() {
        Program program = new Program();
        program.setId(1L);
        program.setDescription("Test description");
        program.setProgramType(ProgramType.DEV);
        program.setProgramOrder(30);

        Program mergedProgram = new Program();
        mergedProgram.setId(1L);
        mergedProgram.setDescription("Updated description");
        mergedProgram.setProgramType(ProgramType.DEV);
        mergedProgram.setProgramOrder(30);

        ProgramDto programDTO = new ProgramDto();
        programDTO.setId(1L);
        programDTO.setDescription("Updated description");
        programDTO.setProgramType(ProgramType.DEV);
        programDTO.setProgramOrder(30);

        EditProgramDto editProgramDto = new EditProgramDto();
        editProgramDto.setDescription("Updated description");

        Mockito.when(programRepository.findById(1L))
                .thenReturn(Optional.of(program));

        Mockito.when(entityMerger.merge(editProgramDto, program))
                .thenReturn(mergedProgram);

        Mockito.when(programRepository.save(mergedProgram))
                .thenReturn(mergedProgram);

        Mockito.when(programDTOMapper.mapProgramToDto(mergedProgram))
                .thenReturn(programDTO);

        ProgramDto resultProgram = programService.update(1L, editProgramDto);

        assertEquals(resultProgram.getDescription(), "Updated description");
    }

    @Test
    public void testUpdateStartDateOnExistedProgramSuccessfully() {
        Date startDate = new Date();
        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("America/La_Paz"));
        calendar.setTime(startDate);

        Program program = new Program();
        program.setId(1L);
        program.setDescription("Test description");
        program.setProgramType(ProgramType.DEV);
        program.setProgramOrder(30);

        Program mergedProgram = new Program();
        mergedProgram.setId(1L);
        mergedProgram.setDescription("Updated description");
        mergedProgram.setProgramType(ProgramType.DEV);
        mergedProgram.setProgramOrder(30);
        mergedProgram.setStartDate(startDate);

        ProgramDto programDTO = new ProgramDto();
        programDTO.setId(1L);
        programDTO.setDescription("Updated description");
        programDTO.setProgramType(ProgramType.DEV);
        programDTO.setProgramOrder(30);
        LocalDate localDate = startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        programDTO.setStartDate(localDate);

        EditProgramDto editProgramDto = new EditProgramDto();
        editProgramDto.setDescription("Updated description");
        editProgramDto.setStartDate(startDate);

        Mockito.when(programRepository.findById(1L))
                .thenReturn(Optional.of(program));

        Mockito.when(entityMerger.merge(editProgramDto, program))
                .thenReturn(mergedProgram);

        Mockito.when(programRepository.save(mergedProgram))
                .thenReturn(mergedProgram);

        Mockito.when(programDTOMapper.mapProgramToDto(mergedProgram))
                .thenReturn(programDTO);

        ProgramDto resultProgram = programService.update(1L, editProgramDto);

        assertEquals(resultProgram.getStartDate().getYear(), calendar.get(Calendar.YEAR));
    }

    @Test
    public void testInvalidUpdateEndDateOnExistedProgramWithoutStartDate() {
        Date endDate = new Date();

        Program program = new Program();
        program.setId(1L);
        program.setDescription("Test description");
        program.setProgramType(ProgramType.DEV);
        program.setProgramOrder(30);

        EditProgramDto editProgramDto = new EditProgramDto();
        editProgramDto.setDescription("Updated description");
        editProgramDto.setEndDate(endDate);

        Mockito.when(programRepository.findById(1L))
                .thenReturn(Optional.of(program));

        Throwable exception = assertThrows(BadRequestException.class, () -> {
            programService.update(1L, editProgramDto);
        });

        assertEquals(EMPTY_START_DATE, exception.getMessage());
    }

    @Test
    public void testInvalidUpdateWhenStartDateIsHigherThanEndDate() {
        Date startDate = new Date(2021, Calendar.SEPTEMBER, 20);
        Date endDate = new Date(2021, Calendar.FEBRUARY, 20);

        Program program = new Program();
        program.setId(1L);
        program.setDescription("Test description");
        program.setProgramType(ProgramType.DEV);
        program.setProgramOrder(30);

        EditProgramDto editProgramDto = new EditProgramDto();
        editProgramDto.setStartDate(startDate);
        editProgramDto.setEndDate(endDate);

        Mockito.when(programRepository.findById(1L))
                .thenReturn(Optional.of(program));

        Mockito.when(dateComparator.compare(endDate, startDate))
                .thenReturn(false);

        Throwable exception = assertThrows(BadRequestException.class, () -> {
            programService.update(1L, editProgramDto);
        });

        assertEquals(INVALID_START_DATE, exception.getMessage());
    }

    @Test
    public void testInvalidUpdateWhenEndDateIsLowerThatCurrentProgramStartDate() {
        Date endDate = new Date(2021, Calendar.FEBRUARY, 20);

        Program program = new Program();
        program.setId(1L);
        program.setDescription("Test description");
        program.setProgramType(ProgramType.DEV);
        program.setProgramOrder(30);
        program.setStartDate(new Date(2021, Calendar.SEPTEMBER, 20));

        EditProgramDto editProgramDto = new EditProgramDto();
        editProgramDto.setEndDate(endDate);

        Mockito.when(programRepository.findById(1L))
                .thenReturn(Optional.of(program));

        Mockito.when(dateComparator.compare(endDate, program.getStartDate()))
                .thenReturn(false);

        Throwable exception = assertThrows(BadRequestException.class, () -> {
            programService.update(1L, editProgramDto);
        });

        assertEquals(INVALID_END_DATE, exception.getMessage());
    }

    @Test
    public void testInvalidUpdateWhenStartDateIsHigherThanCurrentEndDate() {
        Date startDate = new Date(2021, Calendar.DECEMBER, 20);

        Program program = new Program();
        program.setId(1L);
        program.setDescription("Test description");
        program.setProgramType(ProgramType.DEV);
        program.setProgramOrder(30);
        program.setStartDate(new Date(2021, Calendar.FEBRUARY, 20));
        program.setEndDate(new Date(2021, Calendar.SEPTEMBER, 20));

        EditProgramDto editProgramDto = new EditProgramDto();
        editProgramDto.setStartDate(startDate);

        Mockito.when(programRepository.findById(1L))
                .thenReturn(Optional.of(program));

        Mockito.when(dateComparator.compare(program.getEndDate(), startDate))
                .thenReturn(false);

        Throwable exception = assertThrows(BadRequestException.class, () -> {
            programService.update(1L, editProgramDto);
        });

        assertEquals(INVALID_START_DATE, exception.getMessage());
    }
}
