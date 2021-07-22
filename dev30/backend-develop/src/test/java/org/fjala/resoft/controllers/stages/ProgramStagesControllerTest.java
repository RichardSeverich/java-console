package org.fjala.resoft.controllers.stages;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.fjala.resoft.datatypes.Program;
import org.fjala.resoft.dtos.EditStageDto;
import org.fjala.resoft.repositories.ProgramRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import java.io.File;
import java.io.FileInputStream;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.TestMethodOrder;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
@TestMethodOrder(OrderAnnotation.class)
public class ProgramStagesControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ProgramRepository programRepository;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    @Order(1)
    public void testUploadProgramStagesWithCorrectData() throws Exception {
        Program program1 = new Program();
        program1.setName("DEV-30");
        program1.setStages(List.of());
        Program program2 = new Program();
        program2.setName("DEV-31");
        program2.setStages(List.of());
        programRepository.save(program1);
        programRepository.save(program2);
        File file = new File("src/test/resources/json/stagesdata/correctStages.json");
        FileInputStream input = new FileInputStream(file);
        MockMultipartFile mockMultipartFile = new MockMultipartFile("file",
                "correctStages.json", MediaType.APPLICATION_JSON_VALUE
                , input);
        mockMvc.perform(MockMvcRequestBuilders.multipart("/stages/upload")
                .file(mockMultipartFile).contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.saved").value(2))
                .andExpect(jsonPath("$.failed").value(0))
                .andExpect(jsonPath("$.total").value(2));
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    @Order(2)
    public void testUploadProgramStagesWithIncorrectFileHeaders() throws Exception {
        File file = new File("src/test/resources/json/stagesdata/incorrectStages.json");
        FileInputStream input = new FileInputStream(file);
        MockMultipartFile mockMultipartFile = new MockMultipartFile("file",
                "incorrectStages.json", MediaType.APPLICATION_JSON_VALUE
                , input);
        mockMvc.perform(MockMvcRequestBuilders.multipart("/stages/upload")
                .file(mockMultipartFile).contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().is(400));
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    @Order(3)
    public void testGetProgramStages() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                .get("/programs/{id}/stages", 1)
                .contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    @Order(4)
    public void testGetProgramStagesWhenTheProgramDoesNotExist() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                .get("/programs/{id}/stages", 5)
                .contentType("application/json"))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    @Order(5)
    public void testGetProgramStagesWhitTwoStagesWhitSimilarOrder() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders
                .get("/programs/{id}/stages", 1)
                .contentType("application/json"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.status().is(200))
                .andExpect(jsonPath("$.length()").value(3));
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    @Order(6)
    public void updateProgramStages() throws Exception {
        EditStageDto editStageDto1 = new EditStageDto();
        EditStageDto editStageDto2 = new EditStageDto();
        LocalDate date1 = LocalDate.of(2020, 1, 1);
        LocalDate date2 = LocalDate.of(2020, 1, 1);
        editStageDto1.setId(1L);
        editStageDto1.setName("FIRST STAGE");
        editStageDto1.setStartDate(date1);
        editStageDto2.setId(2L);
        editStageDto2.setName("SECOND STAGE");
        editStageDto2.setStartDate(date2);
        mockMvc.perform(MockMvcRequestBuilders
                .put("/stages")
                .content(objectMapper.writeValueAsString(List.of(editStageDto1, editStageDto2)))
                .contentType("application/json"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }
}
