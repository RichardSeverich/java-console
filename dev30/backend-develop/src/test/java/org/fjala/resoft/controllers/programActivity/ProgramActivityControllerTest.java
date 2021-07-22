package org.fjala.resoft.controllers.programActivity;

import org.fjala.resoft.dtos.ActivityDto;
import org.fjala.resoft.services.activity.ActivityService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Date;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class ProgramActivityControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ActivityService activityService;

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void getActivitiesByProgram_thenReturnListOfActivities() throws Exception {

        ActivityDto activityDtoMock = new ActivityDto();
        activityDtoMock.setId(1L);
        activityDtoMock.setName("Charla UMSS");
        activityDtoMock.setLocation("UMSS");
        activityDtoMock.setDate(new Date());

        long programId = 1L;

        Mockito.when(activityService.getActivitiesByProgram(programId))
                .thenReturn(List.of(activityDtoMock));

        this.mockMvc.perform(MockMvcRequestBuilders
                .get("/programs/{id}/activities", programId)
                .contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void getActivitiesByInvalidProgramId_thenReturnNotFound() throws Exception {
        ActivityDto activityDtoMock = new ActivityDto();
        activityDtoMock.setId(1L);
        activityDtoMock.setName("Charla UMSS");
        activityDtoMock.setLocation("UMSS");
        activityDtoMock.setDate(new Date());

        Mockito.when(activityService.getActivitiesByProgram(1L))
                .thenReturn(List.of(activityDtoMock));

        long invalidProgramId = 100L;

        this.mockMvc.perform(MockMvcRequestBuilders
                .get("/programs/{id}/activities", invalidProgramId)
                .contentType("application/json"))
                .andExpect(status().isNoContent());
    }
}
