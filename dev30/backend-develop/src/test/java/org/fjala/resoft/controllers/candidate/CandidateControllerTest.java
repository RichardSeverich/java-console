package org.fjala.resoft.controllers.candidate;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.File;
import java.io.FileInputStream;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.Optional;
import org.fjala.resoft.controllers.AbstractMvcTest;
import org.fjala.resoft.datatypes.CandidateCityType;
import org.fjala.resoft.dtos.CandidateDto;
import org.fjala.resoft.dtos.CandidateSearchDto;
import org.fjala.resoft.dtos.ImportDto;
import org.fjala.resoft.services.candidate.CandidateService;
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
public class CandidateControllerTest extends AbstractMvcTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    CandidateService candidateService;

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void testImportCandidatesByCsvWithValidFileFormat() throws Exception {
        File file = new File("src/test/resources/csv/candidates/candidatesWithCorrectData.csv");
        FileInputStream inputStream = new FileInputStream(file);
        MockMultipartFile mockMultipartFile = new MockMultipartFile("file",
                "candidatesWithCorrectData.csv", "text/csv", inputStream);
        ImportDto response = new ImportDto();
        response.setMessage("Successfully uploaded file: correctPrograms.csv");
        response.setTotal(3);
        response.setSaved(3);
        response.setFailed(0);
        Mockito.when(candidateService.saveFile(mockMultipartFile)).thenReturn(response);
        mockMvc.perform(MockMvcRequestBuilders.multipart("/candidates/upload")
                .file(mockMultipartFile).contentType("text/csv"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(jsonPath("$.message")
                        .value("Successfully uploaded candidates file: candidatesWithCorrectData.csv"))
                .andExpect(jsonPath("$.total").value(3))
                .andExpect(jsonPath("$.saved").value(3))
                .andExpect(jsonPath("$.failed").value(0));
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void testSearchCandidatesByFullName() throws Exception {

        String mockSearch = "Test";

        CandidateSearchDto mockCandidateSearchDto = new CandidateSearchDto();
        mockCandidateSearchDto.setFirstName("Test");
        mockCandidateSearchDto.setLastName("Test");
        mockCandidateSearchDto.setId(1L);

        Collection<CandidateSearchDto> result = Collections.singletonList(mockCandidateSearchDto);

        Mockito.when(candidateService.searchCandidatesFullName(Mockito.anyString())).thenReturn(result);

        this.mockMvc.perform(MockMvcRequestBuilders
                .get("/candidates/search/{keyword}",mockSearch)
                .contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void testGetACandidateByIdSuccessful() throws Exception {
        CandidateDto candidateDto = new CandidateDto();
        candidateDto.setId(1L);
        candidateDto.setFirstName("Test");
        candidateDto.setLastName("Test");
        candidateDto.setBirthdate(LocalDate.parse("1996-04-08"));
        candidateDto.setCity(CandidateCityType.COCHABAMBA);
        candidateDto.setEmail("test.test@fundacion-jala.org");
        candidateDto.setCareer("Computer Engineering");
        candidateDto.setUniversity("UMSS");
        candidateDto.setSemester("7");

        Mockito.when(candidateService.get(1L)).thenReturn(Optional.of(candidateDto));
        this.mockMvc.perform(MockMvcRequestBuilders.get("/candidates/{id}", 1)
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(json(candidateDto)));
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void testGetACandidateByNonExistentId() throws Exception {
        Mockito.when(candidateService.get(1L)).thenReturn(Optional.empty());
        this.mockMvc.perform(MockMvcRequestBuilders.get("/candidates/{id}", 1)
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}
