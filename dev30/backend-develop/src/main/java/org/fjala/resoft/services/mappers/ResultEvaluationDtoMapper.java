package org.fjala.resoft.services.mappers;

import org.fjala.resoft.datatypes.ResultEvaluation;
import org.fjala.resoft.dtos.ResultEvaluationDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface ResultEvaluationDtoMapper {

    @Mapping(target = "activity", expression = "java(resultEvaluation.getActivity().getName())")
    ResultEvaluationDto mapToResultEvaluationDto(ResultEvaluation resultEvaluation);
}
