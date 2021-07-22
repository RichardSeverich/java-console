package org.fjala.resoft.services.imports;

import java.util.Collection;
import org.fjala.resoft.importmodule.filemanager.FileManager;
import org.fjala.resoft.importmodule.filemanager.Record;
import org.fjala.resoft.services.formaters.Formatter;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class ImportServiceImpl<Type> implements ImportService<Type> {

    private FileManager fileManager;

    private Formatter<Type> formatter;

    @Override
    public void setFileManager(FileManager fileManager) {
        this.fileManager = fileManager;
    }

    @Override
    public void setFormatter(Formatter<Type> formatter) {
        this.formatter = formatter;
    }

    @Override
    public Collection<Type> format(MultipartFile file) {
        Collection<Record> records = fileManager.getData(file);
        return formatter.parse(records);
    }
}
