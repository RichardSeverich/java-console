package org.fjala.resoft.controllers.resultevaluation;

import org.fjala.resoft.dtos.ImportDto;
import org.fjala.resoft.repositories.ResultEvaluationRepository;
import org.fjala.resoft.services.resultevaluation.ResultEvaluationService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.io.File;
import java.io.FileInputStream;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class ResultEvaluationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    ResultEvaluationService resultEvaluationService;

    @MockBean
    ResultEvaluationRepository resultEvaluationRepository;

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void testImportResultEvaluationsByCsvWithValidFileformat() throws Exception{
        File file = new File("src/test/resources/csv/resultEvaluation/resultEvaluationCorrectData.csv");
        FileInputStream inputStream = new FileInputStream(file);
        MockMultipartFile mockMultipartFile = new MockMultipartFile("file",
                "resultEvaluationCorrectData.csv", "text/csv", inputStream);
        ImportDto response = new ImportDto();
        response.setMessage("Successfully uploaded file: resultEvaluationCorrectData.csv");
        response.setTotal(3);
        response.setSaved(3);
        response.setFailed(0);
        Mockito.when(resultEvaluationService.saveFile(mockMultipartFile)).thenReturn(response);
        mockMvc.perform(MockMvcRequestBuilders.multipart("/result-evaluations/upload")
                .file(mockMultipartFile).contentType("text/csv"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(jsonPath("$.message")
                        .value("Successfully uploaded Result Evaluations file: resultEvaluationCorrectData.csv"))
                .andExpect(jsonPath("$.total").value(3))
                .andExpect(jsonPath("$.saved").value(3))
                .andExpect(jsonPath("$.failed").value(0));
    }
}
