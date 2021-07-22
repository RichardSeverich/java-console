package org.fjala.resoft.controllers.programCandidate;

import org.fjala.resoft.datatypes.Program;
import org.fjala.resoft.dtos.CandidateListDto;
import org.fjala.resoft.services.candidate.CandidateService;
import org.fjala.resoft.services.program.ProgramService;
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

import java.util.List;
import java.util.Optional;


@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class ProgramCandidateControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CandidateService candidateService;

    @MockBean
    private ProgramService programService;

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void getCandidatesByProgramThenReturnListOfCandidates() throws Exception {
        CandidateListDto candidateListDtoMock = new CandidateListDto();
        candidateListDtoMock.setId(1L);
        candidateListDtoMock.setFullName("Daniel Lopez Jaillita");
        candidateListDtoMock.setEmail("daniel.lopez@gmail.com");
        candidateListDtoMock.setCellphone("73752128");
        candidateListDtoMock.setLastActivity("Examen Ingles I");
        candidateListDtoMock.setStatus("Active");

        long programId = 1L;
        Program program = new Program();
        program.setId(programId);

        Mockito.when(programService.get(programId)).thenReturn(Optional.of(program));
        Mockito.when(candidateService.getCandidatesFullNameAscByProgram(programId))
                .thenReturn(List.of(candidateListDtoMock));

        this.mockMvc.perform(MockMvcRequestBuilders
                .get("/programs/{id}/candidates", programId)
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void getCandidatesByInvalidProgramIdThenReturnNotFound() throws Exception {
        long invalidProgramId = 100L;

        this.mockMvc.perform(MockMvcRequestBuilders
                .get("/programs/{id}/candidates", invalidProgramId)
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

}
