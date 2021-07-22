package org.fjala.resoft.services.mappers;

import org.fjala.resoft.datatypes.User;
import org.fjala.resoft.dtos.RegisterUserDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RegisterUserDtoMapper {

    @Mapping(target = "password", ignore = true)
    @Mapping(target = "authorities", ignore = true)
    User toUser(RegisterUserDto dto);
}
