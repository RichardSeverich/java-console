package org.fjala.resoft.dtos;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NewResultEvaluationDto {

    @NotBlank
    private String title;

    private String setEvaluation;

    @NotBlank
    @Email(
            regexp = "^([_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{1,6}))?$",
            message = "Must be a valid email format"
    )
    private String email;

    @NotBlank
    private String score;

    @NotBlank
    private String program;

    @NotBlank
    private String activity;
}
