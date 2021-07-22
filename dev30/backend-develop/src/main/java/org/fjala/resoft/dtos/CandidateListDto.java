package org.fjala.resoft.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CandidateListDto {

    private Long id;

    private String fullName;

    private String email;

    private String cellphone;

    private String lastActivity;

    private String status;
}
