package org.fjala.resoft.services.formaters;

import java.util.Collection;
import java.util.stream.Collectors;
import org.fjala.resoft.dtos.ImportStageJsonDto;
import org.fjala.resoft.dtos.ProgramInformationJsonDto;
import org.fjala.resoft.exceptions.InvalidJsonFormatException;
import org.fjala.resoft.importmodule.filemanager.Record;
import org.springframework.stereotype.Component;

@Component
public class ProgramStagesFormatter implements Formatter<ImportStageJsonDto> {

    private static final String PROGRAM = "program";
    private static final String INVALID_JSON_FORMAT = "Cannot import file";

    @Override
    public Collection<ImportStageJsonDto> parse(Collection<Record> records) {
        try {
            return records.stream().map(record -> {
                ImportStageJsonDto importStageJsonDto = new ImportStageJsonDto();
                ProgramInformationJsonDto programInfo = record.getValue(PROGRAM, ProgramInformationJsonDto.class);
                importStageJsonDto.setProgram(programInfo);
                return importStageJsonDto;
            }).collect(Collectors.toList());
        } catch (NullPointerException exception) {
            throw new InvalidJsonFormatException(exception, INVALID_JSON_FORMAT);
        }
    }
}
