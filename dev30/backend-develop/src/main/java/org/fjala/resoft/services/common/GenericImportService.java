package org.fjala.resoft.services.common;

import org.fjala.resoft.dtos.ImportDto;
import org.springframework.web.multipart.MultipartFile;

public interface GenericImportService {
    ImportDto saveFile(MultipartFile file);
}
