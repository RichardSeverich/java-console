package org.fjala.resoft.importmodule.filemanager;

import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.fjala.resoft.exceptions.UploadFileException;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class CsvManager implements FileManager {

    private static final String ERROR_UPLOAD_FILE = "Couldn't upload file: ";

    @Override
    public Collection<Record> getData(MultipartFile file) {
        try {
            var reader = new InputStreamReader(file.getInputStream());
            CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT
                    .withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());

            Collection<CSVRecord> csvRecords = csvParser.getRecords();
            List<String> headers = csvParser.getHeaderNames();

            return csvRecords.stream().map(csvRecord -> {
                Map<String, Object> attributes = new HashMap<>();

                IntStream.range(0, csvRecord.size()).forEach(index -> {
                    attributes.put(headers.get(index), csvRecord.get(index));
                });

                Record record = new Record();
                record.setAttributes(attributes);
                return record;
            }).collect(Collectors.toList());
        } catch (IndexOutOfBoundsException | IOException exception) {
            throw new UploadFileException(exception, ERROR_UPLOAD_FILE + file.getOriginalFilename());
        }
    }
}
