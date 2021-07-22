package org.fjala.resoft.services.user;

import org.fjala.resoft.datatypes.Role;
import org.fjala.resoft.datatypes.User;
import org.fjala.resoft.dtos.RegisterUserDto;
import org.fjala.resoft.dtos.UpdateUserDto;
import org.fjala.resoft.repositories.UserRepository;
import org.fjala.resoft.services.mappers.RegisterUserDtoMapper;
import org.junit.Test;

import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;

@RunWith(MockitoJUnitRunner.class)
public class UserDetailsServiceTest {

    @InjectMocks
    private UserDetailsServiceImpl userDetailsService;

    @Mock
    UserRepository userRepository;

    @Mock
    RegisterUserDtoMapper registerUserDTOMapper;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @Test
    public void when_save_user_it_should_return_ok() throws Exception {
        Role role = new Role();
        role.setId(1L);
        role.setName("USER");

        RegisterUserDto registerUserDTO = new RegisterUserDto();
        registerUserDTO.setUsername("New User");
        registerUserDTO.setEmail("new.user@fundation-jala.org");
        registerUserDTO.setPassword("NewUser123");

        User userMock = new User();
        userMock.setId(1L);
        userMock.setUsername("New User");
        userMock.setEmail("new.user@fundation-jala.org");
        userMock.setPassword("NewUser123");
        userMock.setDefaultPassword(true);
        userMock.setAuthorities(List.of(role));

        Mockito.when(registerUserDTOMapper.toUser(registerUserDTO)).thenReturn(userMock);

        Mockito.when(userRepository.save(registerUserDTOMapper.toUser(registerUserDTO))).thenReturn(userMock);

        Mockito.when(passwordEncoder.encode(userMock.getPassword())).thenReturn(userMock.getPassword());

        Optional<User> userResult = userDetailsService.save(registerUserDTO, role);
        Mockito.when(userDetailsService.findUserByEmail("new.user@fundation-jala.org"))
                .thenReturn(Optional.of(userMock));

        assertEquals("New User", userResult.get().getUsername());
        assertEquals("new.user@fundation-jala.org", userResult.get().getEmail());
        assertEquals("NewUser123", userResult.get().getPassword());
    }

    @Test
    public void when_update_password_user_it_should_return_ok() throws Exception {
        UpdateUserDto updateUserDTO = new UpdateUserDto();
        updateUserDTO.setEmail("new.user@fundation-jala.org");
        updateUserDTO.setCurrentPassword("NewUser123");
        updateUserDTO.setNewPassword("NewUser-123");
        updateUserDTO.setConfirmPassword("NewUser-123");

        User user = new User();
        user.setUsername("New User");
        user.setEmail("new.user@fundation-jala.org");
        user.setPassword("NewUser123");

        User userMock = new User();
        userMock.setUsername("New User");
        userMock.setEmail("new.user@fundation-jala.org");
        userMock.setPassword("NewUser-123");

        userDetailsService.updatePassword(user, updateUserDTO);

        Mockito.when(userDetailsService.findUserByEmail("new.user@fundation-jala.org"))
                .thenReturn(Optional.of(userMock));

        User userResult = userDetailsService.findUserByEmail("new.user@fundation-jala.org").get();
        assertEquals("New User", userResult.getUsername());
        assertEquals("new.user@fundation-jala.org", userResult.getEmail());
        assertEquals("NewUser-123", userResult.getPassword());
    }
}
