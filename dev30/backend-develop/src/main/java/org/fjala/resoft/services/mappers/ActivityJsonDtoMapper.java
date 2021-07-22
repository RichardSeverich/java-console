package org.fjala.resoft.services.mappers;

import org.fjala.resoft.datatypes.Activity;
import org.fjala.resoft.dtos.ActivityJsonDto;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface ActivityJsonDtoMapper {
    Activity toActivity(ActivityJsonDto activityJsonDto);
}
