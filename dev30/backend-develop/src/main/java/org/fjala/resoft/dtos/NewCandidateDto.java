package org.fjala.resoft.dtos;

import java.time.LocalDate;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.fjala.resoft.datatypes.CandidateCityType;
import org.fjala.resoft.datatypes.CandidateDocumentType;
import org.fjala.resoft.datatypes.CandidateStatusType;

@Setter
@Getter
@NoArgsConstructor
public class NewCandidateDto {
    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    private String fullName;

    private CandidateCityType city;

    private LocalDate birthdate;

    @NotBlank
    @Email(
            regexp = "^([_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{1,6}))?$",
            message = "Must be a valid email format"
    )
    private String email;

    private CandidateDocumentType documentType;

    @NotBlank(message = "Empty identity number")
    private String documentValue;

    @NotBlank
    @Pattern(
            regexp = "^(6|7)+[0-9]{7}$",
            message = "Invalid phone number"
    )
    private String cellphone;

    private String university;

    private String career;

    @Pattern(
            regexp = "(^[1-9]{1}$|10|^final project$)",
            message = "Invalid value for semester"
    )
    private String semester;

    private boolean workExperience;

    private boolean autodidact;

    private boolean extended;

    @NotBlank
    private String program;

    private CandidateStatusType status;
}
