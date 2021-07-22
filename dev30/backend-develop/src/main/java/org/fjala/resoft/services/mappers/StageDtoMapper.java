package org.fjala.resoft.services.mappers;

import org.fjala.resoft.datatypes.Stage;
import org.fjala.resoft.dtos.StageDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface StageDtoMapper {

    @Mapping(source = "stageOrder", target = "order")
    StageDto mapToStageDto(Stage stage);
}
