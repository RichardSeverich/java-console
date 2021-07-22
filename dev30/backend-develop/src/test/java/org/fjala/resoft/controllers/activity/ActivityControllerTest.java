package org.fjala.resoft.controllers.activity;

import org.fjala.resoft.dtos.ImportDto;
import org.fjala.resoft.services.activity.ActivityService;
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

import java.io.File;
import java.io.FileInputStream;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class ActivityControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ActivityService activityService;

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void testImportActivitiesByJsonWithValidFileFormat() throws Exception {
        File file = new File("src/test/resources/json/activitiesdata/correctActivities.json");
        FileInputStream inputStream = new FileInputStream(file);
        MockMultipartFile mockMultipartFile = new MockMultipartFile("file",
                "correctActivities.json", MediaType.APPLICATION_JSON_VALUE, inputStream);
        ImportDto response = new ImportDto();
        response.setMessage("Successfully uploaded file: correctActivities.json");
        response.setTotal(4);
        response.setSaved(4);
        response.setFailed(0);
        Mockito.when(activityService.saveFile(mockMultipartFile)).thenReturn(response);
        mockMvc.perform(MockMvcRequestBuilders.multipart("/activities/upload")
                .file(mockMultipartFile).contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(jsonPath("$.message")
                        .value("Successfully uploaded file: correctActivities.json"))
                .andExpect(jsonPath("$.total").value(4))
                .andExpect(jsonPath("$.saved").value(4))
                .andExpect(jsonPath("$.failed").value(0));
    }
}