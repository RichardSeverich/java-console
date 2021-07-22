package org.fjala.resoft.controllers.candidateEvaluationResult;

import org.fjala.resoft.controllers.AbstractMvcTest;
import org.fjala.resoft.dtos.ResultEvaluationDto;
import org.fjala.resoft.services.resultevaluation.ResultEvaluationService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Collection;
import java.util.Collections;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class CandidateEvaluationResultControllerTest extends AbstractMvcTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    ResultEvaluationService resultEvaluationService;

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void testGetResultEvaluationByCandidate() throws Exception {
        ResultEvaluationDto resultEvaluationDto = new ResultEvaluationDto();
        resultEvaluationDto.setId(1L);
        resultEvaluationDto.setProgram("DEV-30");
        resultEvaluationDto.setActivity("English Evaluation");
        resultEvaluationDto.setSetEvaluation("Toefl test");
        resultEvaluationDto.setScore(83.00F);

        long candidateId = 1L;

        Collection<ResultEvaluationDto> result = Collections.singletonList(resultEvaluationDto);

        Mockito.when(resultEvaluationService.getResultEvaluationsByCandidate(candidateId)).thenReturn(result);
        this.mockMvc.perform(MockMvcRequestBuilders
                .get("/candidates/{id}/result-evaluations", candidateId )
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void getResultEvaluationByInvalidCandidateIdThenReturnNotFound() throws Exception {
        long invalidCandidateId = 300L;

        this.mockMvc.perform(MockMvcRequestBuilders
                .get("/candidates/{id}/result-evaluations", invalidCandidateId)
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}
