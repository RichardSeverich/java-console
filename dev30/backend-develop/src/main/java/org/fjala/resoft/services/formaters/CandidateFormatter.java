package org.fjala.resoft.services.formaters;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Collection;
import java.util.stream.Collectors;
import org.fjala.resoft.datatypes.CandidateCityType;
import org.fjala.resoft.datatypes.CandidateDocumentType;
import org.fjala.resoft.datatypes.CandidateStatusType;
import org.fjala.resoft.dtos.NewCandidateDto;
import org.fjala.resoft.exceptions.UploadFileException;
import org.fjala.resoft.importmodule.filemanager.Record;
import org.fjala.resoft.utils.dateparser.DateParser;
import org.fjala.resoft.utils.messageparser.MessageParser;
import org.fjala.resoft.utils.stringevalutator.StringEvaluator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CandidateFormatter implements Formatter<NewCandidateDto> {

    private static final String PROGRAM = "Program";
    private static final String FIRST_NAME = "First Name";
    private static final String LAST_NAME = "Last Name";
    private static final String FULL_NAME = "Full Name";
    private static final String CITY = "City";
    private static final String BIRTHDATE = "Birthdate";
    private static final String EMAIL = "Email";
    private static final String DOCUMENT_TYPE = "Document type";
    private static final String DOCUMENT_VALUE = "Document value";
    private static final String CELLPHONE = "Cellphone";
    private static final String UNIVERSITY = "University";
    private static final String CAREER = "Career";
    private static final String SEMESTER = "Semester";
    private static final String WORK_EXPERIENCE = "Work Experience";
    private static final String AUTODIDACT = "Autodidact";
    private static final String EXTENDED = "Extended";
    private static final String STATUS = "Status";
    private static final String INVALID_CSV_FORMAT = "Make sure that your file has the correct format";

    @Autowired
    private MessageParser candidateMessageParser;

    @Autowired
    private DateParser dateWithoutTimeParser;

    @Autowired
    private StringEvaluator yesNoEvaluator;

    @Override
    public Collection<NewCandidateDto> parse(Collection<Record> records) {
        try {
            return records.stream().map(record -> {
                NewCandidateDto candidate = new NewCandidateDto();
                candidate.setProgram(record.getString(PROGRAM));
                candidate.setFirstName(record.getString(FIRST_NAME));
                candidate.setLastName(record.getString(LAST_NAME));
                candidate.setFullName(record.getString(FULL_NAME));
                candidate.setCity(CandidateCityType.getValueOf(record.getString(CITY)));
                candidate.setBirthdate(dateWithoutTimeParser.parse(record.getString(BIRTHDATE),"").toLocalDate());
                candidate.setEmail(record.getString(EMAIL));
                candidate.setDocumentType(CandidateDocumentType.getValueOf(record.getString(DOCUMENT_TYPE)));
                candidate.setDocumentValue(record.getString(DOCUMENT_VALUE));
                candidate.setCellphone(record.getString(CELLPHONE));
                candidate.setUniversity(record.getString(UNIVERSITY));
                candidate.setCareer(record.getString(CAREER));
                candidate.setSemester(record.getString(SEMESTER));
                candidate.setWorkExperience(yesNoEvaluator.evaluate(record.getString(WORK_EXPERIENCE)));
                candidate.setAutodidact(yesNoEvaluator.evaluate(record.getString(AUTODIDACT)));
                candidate.setExtended(yesNoEvaluator.evaluate(record.getString(EXTENDED)));
                candidate.setStatus(CandidateStatusType.getValueOf(record.getString(STATUS)));

                return candidate;
            }).collect(Collectors.toList());
        } catch (IllegalArgumentException | DateTimeParseException exception) {
            throw new UploadFileException(exception, candidateMessageParser.parse(exception.getMessage()));
        } catch (NullPointerException exception) {
            throw new UploadFileException(exception, INVALID_CSV_FORMAT);
        }
    }
}
