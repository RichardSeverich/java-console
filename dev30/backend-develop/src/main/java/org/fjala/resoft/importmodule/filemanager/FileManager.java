package org.fjala.resoft.importmodule.filemanager;

import java.util.Collection;
import org.springframework.web.multipart.MultipartFile;

public interface FileManager {
    Collection<Record> getData(MultipartFile file);
}
