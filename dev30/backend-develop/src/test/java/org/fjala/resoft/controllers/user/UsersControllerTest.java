package org.fjala.resoft.controllers.user;

import org.fjala.resoft.controllers.AbstractMvcTest;
import org.fjala.resoft.datatypes.Role;
import org.fjala.resoft.datatypes.User;
import org.fjala.resoft.dtos.RegisterUserDto;
import org.fjala.resoft.dtos.UpdateUserDto;
import org.fjala.resoft.repositories.RoleRepository;
import org.fjala.resoft.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.io.File;
import java.io.FileInputStream;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class UsersControllerTest extends AbstractMvcTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private RoleRepository roleRepository;

    @MockBean
    private BCryptPasswordEncoder passwordEncoder;

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void testPostAUserWithCorrectData() throws Exception {
        RegisterUserDto registerUserDTO = new RegisterUserDto();
        registerUserDTO.setUsername("New User");
        registerUserDTO.setEmail("new.user@fundacion-jala.org");
        registerUserDTO.setPassword("User12");

        Role role = new Role();
        role.setName("USER");

        when(roleRepository.findByName(Mockito.anyString())).thenReturn(Optional.of(role));

        mockMvc.perform(post("/users")
                .content(json(registerUserDTO))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void testPostAUserRepeated() throws Exception {
        User mockUser = new User();
        mockUser.setEmail("user.repeated@fundacion-jala.org");
        mockUser.setUsername("User Repeated");

        RegisterUserDto registerUserDTO = new RegisterUserDto();
        registerUserDTO.setUsername("User Repeated");
        registerUserDTO.setEmail("user.repeated@fundacion-jala.org");
        registerUserDTO.setPassword("User12");

        Role role = new Role();
        role.setName("USER");

        Mockito.when(
                userRepository.findByEmail(Mockito.anyString())).thenReturn(Optional.of(mockUser));
        when(roleRepository.findByName(Mockito.anyString())).thenReturn(Optional.of(role));

        mockMvc.perform(post("/users")
                .content(json(registerUserDTO))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message")
                        .value("User with email " + mockUser.getEmail() + " already exist"));
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void testPatchAUserWhenUpdatePasswordFirstLogin() throws Exception {
        UpdateUserDto updateUserDTO = new UpdateUserDto();
        updateUserDTO.setEmail("new.user@fundation-jala.org");
        updateUserDTO.setCurrentPassword("NewUser123");
        updateUserDTO.setNewPassword("NewUser-123");
        updateUserDTO.setConfirmPassword("NewUser-123");

        User userMock = new User();
        userMock.setUsername("New User");
        userMock.setEmail("new.user@fundation-jala.org");
        userMock.setPassword("NewUser123");
        userMock.setDefaultPassword(true);

        Mockito.when(
                userRepository.findByEmail("new.user@fundation-jala.org")).thenReturn(Optional.of(userMock));
        Mockito.when(
                passwordEncoder.matches("NewUser123", "NewUser123")).thenReturn(true);
        this.mockMvc.perform(patch("/users")
                .content(json(updateUserDTO))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isAccepted());
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void testPatchAUserWhenUpdatePasswordFirstLoginWithAIncorrectNewPassword() throws Exception {
        UpdateUserDto updateUserDTO = new UpdateUserDto();
        updateUserDTO.setEmail("new.user@fundation-jala.org");
        updateUserDTO.setCurrentPassword("NewUser123");
        updateUserDTO.setNewPassword("NewUser123");
        updateUserDTO.setConfirmPassword("NewUser123");

        User userMock = new User();
        userMock.setUsername("New User");
        userMock.setEmail("new.user@fundation-jala.org");
        userMock.setPassword("NewUser123");
        userMock.setDefaultPassword(true);

        Mockito.when(
                userRepository.findByEmail("new.user@fundation-jala.org")).thenReturn(Optional.of(userMock));
        Mockito.when(
                passwordEncoder.matches("NewUser123","NewUser123")).thenReturn(true);
        this.mockMvc.perform(patch("/users")
                .content(json(updateUserDTO))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message")
                        .value("New password must be alphanumeric " +
                                "with 1 number and 1 special character," +
                                " with 8 characters min and 15 characters max"));
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void testPatchAUserWhenUpdatePasswordFirstLoginWithAIncorrectCurrentPassword() throws Exception {
        UpdateUserDto updateUserDTO = new UpdateUserDto();
        updateUserDTO.setEmail("new.user@fundation-jala.org");
        updateUserDTO.setCurrentPassword("NewUser12");
        updateUserDTO.setNewPassword("NewUser-123");
        updateUserDTO.setConfirmPassword("NewUser-123");

        User userMock = new User();
        userMock.setUsername("New User");
        userMock.setEmail("new.user@fundation-jala.org");
        userMock.setPassword("NewUser123");
        userMock.setDefaultPassword(true);

        Mockito.when(
                userRepository.findByEmail("new.user@fundation-jala.org")).thenReturn(Optional.of(userMock));
        Mockito.when(
                passwordEncoder.matches("NewUser123","NewUser123")).thenReturn(true);
        this.mockMvc.perform(patch("/users")
                .content(json(updateUserDTO))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message")
                        .value("Wrong current password OR New passwords don't match, Please try again"));
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void testUploadUsersWithCorrectData() throws Exception {
        Role role = new Role();
        role.setName("USER");
        when(roleRepository.findByName(Mockito.anyString())).thenReturn(Optional.of(role));
        File file = new File("src/test/resources/csv/usersWithCorrectData.csv");
        FileInputStream input = new FileInputStream(file);
        MockMultipartFile mockMultipartFile = new MockMultipartFile("file",
                "UsersWithCorrectData.csv", "text/csv", input);
        mockMvc.perform(MockMvcRequestBuilders
                .multipart("/users/upload")
                .file(mockMultipartFile)
                .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(MockMvcResultMatchers
                        .status().isOk())
                .andExpect(jsonPath("$.saved").value(5))
                .andExpect(jsonPath("$.failed").value(0))
                .andExpect(jsonPath("$.total").value(5));

    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void testUploadUsersWithIncorrectData() throws Exception {
        Role role = new Role();
        role.setName("USER");
        when(roleRepository.findByName(Mockito.anyString())).thenReturn(Optional.of(role));
        File file = new File("src/test/resources/csv/usersWithIncorrectData.csv");
        FileInputStream input = new FileInputStream(file);
        MockMultipartFile mockMultipartFile = new MockMultipartFile("file",
                "UsersWithIncorrectData.csv", "text/csv", input);
        mockMvc.perform(MockMvcRequestBuilders
                .multipart("/users/upload")
                .file(mockMultipartFile)
                .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(MockMvcResultMatchers
                        .status().isOk())
                .andExpect(jsonPath("$.saved").value(4))
                .andExpect(jsonPath("$.failed").value(5))
                .andExpect(jsonPath("$.total").value(9));

    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void testUploadUsersWithIncorrectFileHeaders() throws Exception {
        Role role = new Role();
        role.setName("USER");
        when(roleRepository.findByName(Mockito.anyString())).thenReturn(Optional.of(role));
        File file = new File("src/test/resources/csv/usersWithIncorrectHeaders.csv");
        FileInputStream input = new FileInputStream(file);
        MockMultipartFile mockMultipartFile = new MockMultipartFile("file",
                "UsersWithIncorrectData.csv", "text/csv", input);
        mockMvc.perform(MockMvcRequestBuilders
                .multipart("/users/upload")
                .file(mockMultipartFile)
                .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(MockMvcResultMatchers
                        .status().isOk())
                .andExpect(jsonPath("$.saved").value(0))
                .andExpect(jsonPath("$.failed").value(5))
                .andExpect(jsonPath("$.total").value(5));

    }
}
