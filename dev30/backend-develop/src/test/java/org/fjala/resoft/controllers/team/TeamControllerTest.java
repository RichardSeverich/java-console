package org.fjala.resoft.controllers.team;

import org.fjala.resoft.datatypes.User;
import org.fjala.resoft.repositories.TeamRepository;

import org.fjala.resoft.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
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
import java.util.Optional;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class TeamControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Mock
    TeamRepository teamRepository;

    @MockBean
    UserRepository userRepository;

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void whenSaveTeam_thenReturnCreated() throws Exception {
        User userMock = new User();
        userMock.setUsername("New User");
        userMock.setEmail("user.test@fundation-jala.org");
        userMock.setPassword("NewUser123");
        userMock.setDefaultPassword(true);

        Mockito.when(
                userRepository.findByEmail(Mockito.anyString())).thenReturn(Optional.of(userMock));

        File file = new File("src/test/resources/json/teamsdata/correctTeam.json");
        FileInputStream input = new FileInputStream(file);
        MockMultipartFile mockMultipartFile = new MockMultipartFile("file",
                "correctTeam.json", MediaType.APPLICATION_JSON_VALUE, input);
        mockMvc.perform(MockMvcRequestBuilders
                .multipart("/teams/upload")
                .file(mockMultipartFile).contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(MockMvcResultMatchers.status().is(200));
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void testUploadProgramStagesWithIncorrectFileHeaders() throws Exception {
        File file = new File("src/test/resources/json/teamsdata/incorrectTeam.json");
        FileInputStream input = new FileInputStream(file);
        MockMultipartFile mockMultipartFile = new MockMultipartFile("file",
                "incorrectTeam.json", MediaType.APPLICATION_JSON_VALUE, input);
        mockMvc.perform(MockMvcRequestBuilders
                .multipart("/teams/upload")
                .file(mockMultipartFile).contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(MockMvcResultMatchers.status().is(400));
    }
}
