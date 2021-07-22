package org.fjala.resoft.services.stage;

import java.util.List;
import org.fjala.resoft.dtos.EditStageDto;
import org.fjala.resoft.dtos.ImportDto;
import org.fjala.resoft.dtos.StageDto;
import org.springframework.web.multipart.MultipartFile;

public interface StageService<Type> {

    ImportDto saveFile(MultipartFile file);

    List<Type> update(List<EditStageDto> stages);
}
