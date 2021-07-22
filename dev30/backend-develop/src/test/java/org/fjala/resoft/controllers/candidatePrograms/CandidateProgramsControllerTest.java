package org.fjala.resoft.controllers.candidatePrograms;

import org.fjala.resoft.controllers.AbstractMvcTest;
import org.fjala.resoft.services.candidate.CandidateService;
import org.fjala.resoft.dtos.CandidateProgramsDto;
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
public class CandidateProgramsControllerTest extends AbstractMvcTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    CandidateService candidateService;

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void testGetCandidatePrograms() throws Exception {
        CandidateProgramsDto mockCandidateProgramsDto = new CandidateProgramsDto();
        mockCandidateProgramsDto.setId(1L);
        mockCandidateProgramsDto.setProgram("DEV-30");
        mockCandidateProgramsDto.setStatus("Active");

        long candidateId = 1L;

        Collection<CandidateProgramsDto> response = Collections.singletonList(mockCandidateProgramsDto);

        Mockito.when(candidateService.getCandidatePrograms(candidateId)).thenReturn(response);
        this.mockMvc.perform(MockMvcRequestBuilders
                .get("/candidates/{id}/history", candidateId )
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void getCandidateProgramsInvalidCandidateIdThenReturnNotFound() throws Exception {
        long invalidCandidateId = 1000L;

        this.mockMvc.perform(MockMvcRequestBuilders
                .get("/candidates/{id}/history", invalidCandidateId)
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}
