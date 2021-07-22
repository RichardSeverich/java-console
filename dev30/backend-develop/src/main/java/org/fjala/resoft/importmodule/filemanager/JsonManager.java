package org.fjala.resoft.importmodule.filemanager;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import org.fjala.resoft.exceptions.UploadFileException;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class JsonManager implements FileManager {

    private static final String ERROR_UPLOAD_FILE = "Couldn't upload file: ";

    @Override
    public Collection<Record> getData(MultipartFile file) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            InputStreamReader reader = new InputStreamReader(file.getInputStream());
            JavaType type = mapper.getTypeFactory()
                    .constructCollectionType(List.class, HashMap.class);
            List<HashMap<String, Object>> objects = mapper.readValue(reader, type);
            Collection<Record> records = new ArrayList<>();

            objects.stream().forEach(o -> {
                Record record = new Record();
                record.setAttributes(o);
                records.add(record);
            });
            return records;
        } catch (IOException | IndexOutOfBoundsException exception) {
            throw new UploadFileException(exception, ERROR_UPLOAD_FILE + file.getOriginalFilename());
        }
    }
}
