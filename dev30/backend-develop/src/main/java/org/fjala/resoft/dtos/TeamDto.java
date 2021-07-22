package org.fjala.resoft.dtos;

import java.util.Date;
import lombok.Data;

@Data
public class TeamDto {
    private Long id;
    private String name;
    private Date createdAt;
}
