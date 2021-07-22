package org.fjala.resoft.services.mappers;

import org.fjala.resoft.datatypes.ResultEvaluation;
import org.fjala.resoft.dtos.NewResultEvaluationDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface NewResultEvaluationDtoMapper {
    @Mapping(target = "activity", ignore = true)
    NewResultEvaluationDto mapToDto(ResultEvaluation resultEvaluation);
}
