package org.fjala.resoft.controllers.user;

import org.fjala.resoft.controllers.AbstractMvcTest;
import org.fjala.resoft.datatypes.User;
import org.fjala.resoft.dtos.RegisterUserDto;
import org.fjala.resoft.repositories.UserRepository;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.rules.SpringClassRule;
import org.springframework.test.context.junit4.rules.SpringMethodRule;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static org.junit.runners.Parameterized.Parameters;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
@RunWith(Parameterized.class)
public class UserControllerUserRegistrationTest extends AbstractMvcTest {

    @ClassRule
    public static final SpringClassRule SPRING_CLASS_RULE = new SpringClassRule();

    @Rule
    public final SpringMethodRule springMethodRule = new SpringMethodRule();

    @Autowired
    private MockMvc mockMvc;

    private RegisterUserDto registerUserDTO;

    @MockBean
    private UserRepository userRepository;

    public UserControllerUserRegistrationTest(RegisterUserDto dto) {
        this.registerUserDTO = dto;
    }

    @Parameters
    public static Collection users() {
        return List.of(
                createRegisterUserDto(null, "new.user@fundacion-jala.org", "NewUser123"),
                createRegisterUserDto("", "new.user@fundacion-jala.org", "NewUser123"),
                createRegisterUserDto("*!1New User", "new.user@fundacion-jala.org", "NewUser123"),
                createRegisterUserDto("New User", "", "NewUser123"),
                createRegisterUserDto("New User", "", "NewUser123"),
                createRegisterUserDto("New User", "newuser_00@fundacion-jala.org", "NewUser123"),
                createRegisterUserDto("New User", "new.user@other-domain.org", "NewUser123"),
                createRegisterUserDto("New User", "new.user@fundacion-jala.org", ""),
                createRegisterUserDto("New User", "new.user@fundacion-jala.org", "!*~NewUser123"));
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "USER")
    public void testSaveAnUserWithIncorrectDate() throws Exception {
        User mockUser = new User();
        mockUser.setEmail("user.authorized@fundacion-jala.org");
        mockUser.setUsername("USER.AUTHORIZED");

        when(userRepository.findByEmail(Mockito.anyString())).thenReturn(Optional.of(mockUser));

        mockMvc.perform(post("/users")
                .content(json(registerUserDTO))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    private static RegisterUserDto createRegisterUserDto(String userName, String email, String password) {
        RegisterUserDto registerUserDTO = new RegisterUserDto();
        registerUserDTO.setUsername(userName);
        registerUserDTO.setEmail(email);
        registerUserDTO.setPassword(password);
        return registerUserDTO;
    }
}