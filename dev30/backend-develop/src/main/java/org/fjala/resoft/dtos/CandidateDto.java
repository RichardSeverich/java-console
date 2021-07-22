package org.fjala.resoft.dtos;

import java.time.LocalDate;
import lombok.Data;
import org.fjala.resoft.datatypes.CandidateCityType;

@Data
public class CandidateDto {
    private Long id;
    private String firstName;
    private String lastName;
    private CandidateCityType city;
    private LocalDate birthdate;
    private String email;
    private String university;
    private String career;
    private String semester;
    private String cellphone;
}
