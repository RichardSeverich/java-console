package org.fjala.resoft.services.formaters;

import java.util.Collection;
import java.util.stream.Collectors;
import org.fjala.resoft.datatypes.ResultEvaluation;
import org.fjala.resoft.dtos.NewResultEvaluationDto;
import org.fjala.resoft.exceptions.UploadFileException;
import org.fjala.resoft.importmodule.filemanager.Record;
import org.fjala.resoft.utils.messageparser.MessageParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ResultEvaluationFormatter implements Formatter<NewResultEvaluationDto> {

    private static final String TITLE = "Title";
    private static final String SET = "Set Evaluation";
    private static final String EMAIL = "Email";
    private static final String SCORE = "Score";
    private static final String PROGRAM = "Program";
    private static final String ACTIVITY = "Activity";

    private static final String INVALID_CSV_FORMAT = "Make sure that your file has the correct format";

    @Override
    public Collection<NewResultEvaluationDto> parse(Collection<Record> records) {
        try {
            return records.stream().map(record -> {
                NewResultEvaluationDto resultEvaluation = new NewResultEvaluationDto();
                resultEvaluation.setTitle(record.getString(TITLE));
                resultEvaluation.setSetEvaluation(record.getString(SET));
                resultEvaluation.setEmail(record.getString(EMAIL));
                resultEvaluation.setScore(record.getString(SCORE));
                resultEvaluation.setProgram(record.getString(PROGRAM));
                resultEvaluation.setActivity(record.getString(ACTIVITY));

                return resultEvaluation;
            }).collect(Collectors.toList());
        } catch (NullPointerException exception) {
            throw new UploadFileException(exception, INVALID_CSV_FORMAT);
        }
    }
}
