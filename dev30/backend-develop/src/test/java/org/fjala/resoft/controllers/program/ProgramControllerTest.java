package org.fjala.resoft.controllers.program;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import java.io.File;
import java.io.FileInputStream;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.fjala.resoft.datatypes.Program;
import org.fjala.resoft.datatypes.ProgramType;
import org.fjala.resoft.dtos.EditProgramDto;
import org.fjala.resoft.dtos.ImportDto;
import org.fjala.resoft.dtos.NewProgramDto;
import org.fjala.resoft.dtos.ProgramDto;
import org.fjala.resoft.dtos.StageDto;
import org.fjala.resoft.repositories.ProgramRepository;
import org.fjala.resoft.services.program.ProgramService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class ProgramControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    ProgramService<ProgramDto, NewProgramDto, StageDto> programService;

    @MockBean
    ProgramRepository programRepository;

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    void whenGetPrograms_thenReturns200() throws Exception {
        mockMvc.perform(get("/programs")
                .contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    void whenGetProgramById_thenReturns400() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                .get("/programs/{id}", 1)
                .contentType("application/json"))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    void whenDeleteProgramById_thenReturns404() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                .delete("/programs/{id}", 1)
                .contentType("application/json"))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void whenSaveProgram_thenReturnCreated() throws Exception {
        NewProgramDto newProgramDTO = new NewProgramDto();
        newProgramDTO.setDescription("Test description");
        newProgramDTO.setProgramType(ProgramType.DEV);
        newProgramDTO.setProgramOrder(30);

        Program program = new Program();
        program.setId(1L);
        program.setDescription("Test description");
        program.setProgramType(ProgramType.DEV);
        program.setProgramOrder(30);

        ProgramDto programDTO = new ProgramDto();
        programDTO.setId(1L);
        programDTO.setDescription("Test description");
        programDTO.setProgramType(ProgramType.DEV);
        programDTO.setProgramOrder(30);

        Mockito.when(programRepository.save(program))
                .thenReturn(program);

        Mockito.when(programService.save(newProgramDTO))
                .thenReturn(programDTO);

        mockMvc.perform(MockMvcRequestBuilders
                .post("/programs")
                .content(objectMapper.writeValueAsString(newProgramDTO))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    void whenGetPrograms_thenReturnListOfPrograms() throws Exception {

        ProgramDto programDTO = new ProgramDto();
        programDTO.setId(1L);
        programDTO.setDescription("Test description");
        programDTO.setProgramType(ProgramType.DEV);
        programDTO.setProgramOrder(30);

        Mockito.when(programService.getAll())
                .thenReturn(List.of(programDTO));

        this.mockMvc.perform(MockMvcRequestBuilders
                .get("/programs")
                .contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    void whenGetProgramByValidId_thenReturnAProgramWithId() throws Exception {
        ProgramDto programDTO = new ProgramDto();
        programDTO.setId(1L);
        programDTO.setDescription("Test description");
        programDTO.setProgramType(ProgramType.DEV);
        programDTO.setProgramOrder(30);

        Mockito.when(programService.get(1L))
                .thenReturn(Optional.of(programDTO));

        this.mockMvc.perform(MockMvcRequestBuilders
                .get("/programs/{id}", 1)
                .contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    void whenGetProgramByInvalidId_thenReturnABadRequest() throws Exception {

        ProgramDto programDTO = new ProgramDto();
        programDTO.setId(1L);
        programDTO.setDescription("Test description");
        programDTO.setProgramType(ProgramType.DEV);
        programDTO.setProgramOrder(30);

        Mockito.when(programService.get(1L))
                .thenReturn(Optional.of(programDTO));

        this.mockMvc.perform(MockMvcRequestBuilders
                .get("/programs/{id}", 2)
                .contentType("application/json"))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void testImportProgramsByCsvWithValidFileFormat() throws Exception {
        File file = new File("src/test/resources/csv/programs/correctPrograms.csv");
        FileInputStream inputStream = new FileInputStream(file);
        MockMultipartFile mockMultipartFile = new MockMultipartFile("file",
                "correctPrograms.csv", "text/csv", inputStream);
        ImportDto response = new ImportDto();
        response.setMessage("Successfully uploaded file: correctPrograms.csv");
        response.setTotal(5);
        response.setSaved(5);
        response.setFailed(0);
        Mockito.when(programService.saveFile(mockMultipartFile)).thenReturn(response);
        mockMvc.perform(MockMvcRequestBuilders.multipart("/programs/upload")
                .file(mockMultipartFile).contentType("text/csv"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(jsonPath("$.message")
                        .value("Successfully uploaded programs file: correctPrograms.csv"))
                .andExpect(jsonPath("$.total").value(5))
                .andExpect(jsonPath("$.saved").value(5))
                .andExpect(jsonPath("$.failed").value(0));
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void testValidUpdateProgramSetStartAndEndDatesWhenProgramExists() throws Exception {
        EditProgramDto editProgram = new EditProgramDto();
        editProgram.setStartDate(new Date(2021, Calendar.FEBRUARY, 20));
        editProgram.setEndDate(new Date(2021, Calendar.SEPTEMBER, 20));

        ProgramDto updateProgramDTO = new ProgramDto();
        updateProgramDTO.setId(1L);
        updateProgramDTO.setDescription("Test description");
        updateProgramDTO.setProgramType(ProgramType.DEV);
        updateProgramDTO.setProgramOrder(30);
        updateProgramDTO.setStartDate(LocalDate.of(2021, 1, 20));
        updateProgramDTO.setEndDate(LocalDate.of(2021, 8, 20));

        Mockito.when(programService.exist(1L))
                .thenReturn(true);

        Mockito.when(programService.update(1L, editProgram))
                .thenReturn(updateProgramDTO);

        mockMvc.perform(MockMvcRequestBuilders.put("/programs/{id}", 1L)
                .content(objectMapper.writeValueAsBytes(updateProgramDTO))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void testInvalidUpdateProgramSetStartAndEndDatesWhenProgramNotExists() throws Exception {
        EditProgramDto editProgram = new EditProgramDto();
        editProgram.setStartDate(new Date(2021, Calendar.FEBRUARY, 20));
        editProgram.setEndDate(new Date(2021, Calendar.SEPTEMBER, 20));

        ProgramDto updateProgramDTO = new ProgramDto();
        updateProgramDTO.setId(1L);
        updateProgramDTO.setDescription("Test description");
        updateProgramDTO.setProgramType(ProgramType.DEV);
        updateProgramDTO.setProgramOrder(30);
        updateProgramDTO.setStartDate(LocalDate.of(2021, 1, 20));
        updateProgramDTO.setEndDate(LocalDate.of(2021, 8, 20));

        Mockito.when(programService.exist(1L))
                .thenReturn(false);

        Mockito.when(programService.update(1L, editProgram))
                .thenReturn(updateProgramDTO);

        mockMvc.perform(MockMvcRequestBuilders.put("/programs/{id}", 1L)
                .content(objectMapper.writeValueAsBytes(updateProgramDTO))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}
