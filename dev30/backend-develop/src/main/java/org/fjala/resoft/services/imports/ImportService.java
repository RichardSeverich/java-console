package org.fjala.resoft.services.imports;

import java.util.Collection;
import org.fjala.resoft.importmodule.filemanager.FileManager;
import org.fjala.resoft.services.formaters.Formatter;
import org.springframework.web.multipart.MultipartFile;

public interface ImportService<Type> {

    Collection<Type> format(MultipartFile file);

    void setFileManager(FileManager fileManager);

    void setFormatter(Formatter<Type> formatter);
}
