package org.fjala.resoft.dtos;

import lombok.Data;

@Data
public class UpdateUserDto {

    private String email;

    private String currentPassword;

    private String newPassword;

    private String confirmPassword;
}
