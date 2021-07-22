package org.fjala.resoft.services.formaters;

import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;
import org.fjala.resoft.datatypes.Program;
import org.fjala.resoft.datatypes.ProgramType;
import org.fjala.resoft.exceptions.UploadFileException;
import org.fjala.resoft.importmodule.filemanager.Record;
import org.fjala.resoft.utils.messageparser.MessageParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProgramFormatter implements Formatter<Program> {

    private static final String TYPE = "Type";
    private static final String ORDER = "Order";
    private static final String DESCRIPTION = "Description";
    private static final String INVALID_JSON_FORMAT = "Make sure that your file has the correct format";

    @Autowired
    private MessageParser programMessageParser;

    @Override
    public Collection<Program> parse(Collection<Record> records) {
        try {
            return records.stream().map(record -> {
                Program program = new Program();
                String type = record.getString(TYPE).toUpperCase();
                int order = record.getInteger(ORDER);
                program.setProgramType(ProgramType.valueOf(type));
                program.setProgramOrder(order);
                program.setDescription(record.getString(DESCRIPTION));
                program.setCreatedAt(new Date());
                program.setName(type + "-" + order);
                return program;
            }).collect(Collectors.toList());
        } catch (IllegalArgumentException exception) {
            throw new UploadFileException(exception, programMessageParser.parse(exception.getMessage()));
        } catch (NullPointerException exception) {
            throw new UploadFileException(exception, INVALID_JSON_FORMAT);
        }
    }
}
