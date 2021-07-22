package org.fjala.resoft.dtos;

import java.util.Date;
import lombok.Data;
import org.fjala.resoft.datatypes.ActivityStatus;

@Data
public class ActivityDto {

    private Long id;

    private String name;

    private String location;

    private Date date;

    private ActivityStatus status;

    private String time;
}
