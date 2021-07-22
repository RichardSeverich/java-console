package org.fjala.resoft.services.mappers;

import org.fjala.resoft.datatypes.Activity;
import org.fjala.resoft.dtos.ActivityDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface ActivityDtoMapper {

    @Mapping(target = "id", source = "id")
    ActivityDto mapToDto(Activity activity);
}
