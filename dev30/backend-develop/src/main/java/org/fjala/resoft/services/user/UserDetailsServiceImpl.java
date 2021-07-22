package org.fjala.resoft.services.user;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import javax.validation.Validator;
import org.fjala.resoft.datatypes.Role;
import org.fjala.resoft.datatypes.User;
import org.fjala.resoft.dtos.ImportDto;
import org.fjala.resoft.dtos.RegisterUserDto;
import org.fjala.resoft.dtos.UpdateUserDto;
import org.fjala.resoft.importmodule.filemanager.CsvManager;
import org.fjala.resoft.repositories.UserRepository;
import org.fjala.resoft.services.formaters.Formatter;
import org.fjala.resoft.services.imports.ImportService;
import org.fjala.resoft.services.mappers.RegisterUserDtoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UserDetailsServiceImpl implements UserDetailsService, UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private RegisterUserDtoMapper registerUserDtoMapper;

    @Autowired
    private Validator validator;

    @Autowired
    private Formatter<RegisterUserDto> formatter;

    @Autowired
    private ImportService<RegisterUserDto> importService;

    @Autowired
    private CsvManager csvManager;

    @Value("${resoft.users.csv.records-number}")
    private int recordsNumber;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username).get();
    }

    public Optional<User> findUserByEmail(final String email) {
        return userRepository.findByEmail(email);
    }

    public Optional save(RegisterUserDto userDto, Role role) {
        User user = registerUserDtoMapper.toUser(userDto);
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setAuthorities(List.of(role));
        user.setDefaultPassword(true);
        userRepository.save(user);
        return Optional.of(user);
    }

    public Optional updatePassword(User user, UpdateUserDto updateUserDto) {
        String newPassword = updateUserDto.getNewPassword();

        if (!newPassword.equals(updateUserDto.getConfirmPassword())
                || !passwordEncoder.matches(updateUserDto.getCurrentPassword(), user.getPassword())) {
            return Optional.empty();
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setDefaultPassword(false);
        userRepository.save(user);
        return Optional.of(user);
    }

    @Override
    public ImportDto saveFile(MultipartFile file, Role role) {
        importService.setFileManager(csvManager);
        importService.setFormatter(formatter);
        Collection<RegisterUserDto> registerUserDtos = importService.format(file);
        int saved = 0;
        int recordsNumberTemp = recordsNumber;
        Iterator<RegisterUserDto> iterator = registerUserDtos.iterator();
        while (iterator.hasNext() && recordsNumberTemp > 0) {
            RegisterUserDto registerUserDto = iterator.next();
            if (!hasDataError(registerUserDto)) {
                save(registerUserDto, role);
                saved++;
            }
            recordsNumberTemp--;
        }
        int total = registerUserDtos.size() < recordsNumber ? registerUserDtos.size() : recordsNumber;
        ImportDto result = new ImportDto();
        result.setSaved(saved);
        result.setTotal(total);
        result.setFailed(total - saved);
        return result;
    }

    private boolean hasDataError(RegisterUserDto registerUserDto) {
        var constraintViolations = validator.validate(registerUserDto);
        return !constraintViolations.isEmpty() || findUserByEmail(registerUserDto.getEmail()).isPresent();
    }
}
