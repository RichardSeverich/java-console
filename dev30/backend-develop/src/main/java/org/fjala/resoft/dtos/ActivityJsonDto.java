package org.fjala.resoft.dtos;

import java.time.LocalDateTime;
import lombok.Data;
import org.fjala.resoft.datatypes.ActivityStatus;
import org.fjala.resoft.datatypes.ActivityType;

@Data
public class ActivityJsonDto {

    private String name;

    private String stageName;

    private String location;

    private LocalDateTime date;

    private String time;

    private ActivityStatus status;

    private ActivityType type;
}
