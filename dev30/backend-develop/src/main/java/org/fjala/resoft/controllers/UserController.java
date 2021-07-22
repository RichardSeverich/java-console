package org.fjala.resoft.controllers;

import java.util.Optional;
import javax.validation.Valid;
import org.fjala.resoft.datatypes.Role;
import org.fjala.resoft.datatypes.User;
import org.fjala.resoft.dtos.ImportDto;
import org.fjala.resoft.dtos.RegisterUserDto;
import org.fjala.resoft.dtos.UpdateUserDto;
import org.fjala.resoft.exceptions.BadRequestException;
import org.fjala.resoft.exceptions.InvalidRoleException;
import org.fjala.resoft.exceptions.InvalidUserException;
import org.fjala.resoft.services.role.RoleService;
import org.fjala.resoft.services.user.UserDetailsServiceImpl;
import org.fjala.resoft.utils.RulesValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/users")
@RestController
public class UserController implements ImportController {

    private static final String DEFAULT_USER_ROLE = "USER";

    private static final String SUCCESSFULLY_UPLOADED_USERS =
            "Successfully uploaded users file: ";
    @Autowired
    private UserDetailsServiceImpl userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private RulesValidator rulesValidator;

    @PostMapping
    public ResponseEntity<User> save(@Valid @RequestBody RegisterUserDto registerUserDto) {
        Optional<Role> role = roleService.findByName(DEFAULT_USER_ROLE);
        if (!role.isPresent()) {
            throw new InvalidRoleException("No role defined");
        }
        if (userService.findUserByEmail(registerUserDto.getEmail()).isPresent()) {
            throw new InvalidUserException("User with email " + registerUserDto.getEmail() + " already exist");
        }
        if (userService.save(registerUserDto, role.get()).isEmpty()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity<Void> updatePassword(@RequestBody UpdateUserDto updateUserDto) {
        User user = userService.findUserByEmail(updateUserDto.getEmail()).get();
        if (!user.isDefaultPassword()) {
            return new ResponseEntity<Void>(HttpStatus.MOVED_PERMANENTLY);
        }
        if (!rulesValidator.isValidPassword(updateUserDto.getNewPassword())) {
            throw new BadRequestException("New password must be alphanumeric "
                    + "with 1 number and 1 special character, with 8 characters min "
                    + "and 15 characters max");
        }
        if (userService.updatePassword(user, updateUserDto).isEmpty()) {
            throw new BadRequestException("Wrong current password OR New passwords don't match, Please try again");
        }
        return new ResponseEntity<Void>(HttpStatus.ACCEPTED);
    }

    @Override
    public ResponseEntity<ImportDto> uploadFile(MultipartFile file) {
        Optional<Role> optionalRole = roleService.findByName(DEFAULT_USER_ROLE);
        Role role = optionalRole.orElseThrow(() -> new InvalidRoleException("No role defined"));

        ImportDto response = userService.saveFile(file, role);
        response.setMessage(SUCCESSFULLY_UPLOADED_USERS + file.getOriginalFilename());
        return ResponseEntity.ok(response);
    }
}
