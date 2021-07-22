package org.fjala.resoft.dtos;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterUserDto {

    @NotBlank
    @Email(
            regexp = "^[a-zA-Z]+.[a-zA-Z]+@fundacion-jala.org$",
            message = "must have this format name.lastname@fundacion-jala.org"
    )
    private String email;

    @Size(min = 6, max = 6)
    @NotBlank
    @Pattern(
            regexp = "^[a-zA-Z0-9]+$",
            message = "must contains only letters and numbers"
    )
    private String password;

    @NotBlank
    @Pattern(
            regexp = "^[A-Za-z]+ [A-Za-z]+$",
            message = "must have this format 'Name Lastname'"
    )
    private String username;
}
