package org.fjala.resoft.controllers.user;

import org.fjala.resoft.controllers.AbstractMvcTest;
import org.fjala.resoft.datatypes.Role;
import org.fjala.resoft.datatypes.User;
import org.fjala.resoft.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;
import java.util.Optional;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class AuthenticationControllerTest extends AbstractMvcTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void testLoginSuccess() throws Exception {

        User userMock = new User();
        userMock.setId(null);
        userMock.setEmail("user@fundation-jala.org");
        userMock.setPassword("user123");
        userMock.setUsername(null);
        userMock.setAuthorities(null);

        Role role = new Role();
        role.setId(1L);
        role.setName("USER");
        User user = new User();
        user.setId(1L);
        user.setPassword(passwordEncoder.encode("user123"));
        user.setDefaultPassword(false);
        user.setEmail("user@fundation-jala.org");
        user.setAuthorities(List.of(role));

        Mockito.when(
                userRepository.findByEmail(Mockito.anyString())).thenReturn(Optional.of(user));

        mockMvc.perform(MockMvcRequestBuilders.post("/auth/signin")
                .content(json(userMock))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists());
    }

    @Test
    public void testLoginWithAUserNonExistent() throws Exception {
        User user = new User();
        user.setEmail("user.nonexistent@function-jala.org");
        user.setPassword("UserNonExistent123");
        mockMvc.perform(MockMvcRequestBuilders.post("/auth/signin")
                .content(json(user))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.message")
                        .value("Make sure that the email and password are correct"));
    }

    @Test
    public void testLoginWithAUserExistentAndIncorrectPassword() throws Exception {
        User user = new User();
        user.setEmail("user.nonexistent@function-jala.org");
        user.setPassword("UserNonExistent123");
        mockMvc.perform(MockMvcRequestBuilders.post("/auth/signin")
                .content(json(user))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.message")
                        .value("Make sure that the email and password are correct"));
    }

    @Test
    public void testLoginWhenUserNotChangePassword() throws Exception {
        User userMock = new User();
        userMock.setId(null);
        userMock.setEmail("new.user@fundation-jala.org");
        userMock.setPassword("NewUser123");
        userMock.setUsername(null);
        userMock.setAuthorities(null);

        Role role = new Role();
        role.setId(1L);
        role.setName("USER");

        User user = new User();
        user.setId(1L);
        user.setPassword(passwordEncoder.encode("NewUser123"));
        user.setDefaultPassword(true);
        user.setEmail("new.user@fundation-jala.org");
        user.setAuthorities(List.of(role));

        Mockito.when(
                userRepository.findByEmail(Mockito.anyString())).thenReturn(Optional.of(user));

        mockMvc.perform(MockMvcRequestBuilders.post("/auth/signin")
                .content(json(userMock))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isUpgradeRequired())
                .andExpect(jsonPath("$.token").exists());
    }
}