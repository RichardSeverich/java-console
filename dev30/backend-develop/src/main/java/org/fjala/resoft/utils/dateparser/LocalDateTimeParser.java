package org.fjala.resoft.utils.dateparser;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.springframework.stereotype.Component;

@Component
public class LocalDateTimeParser implements DateParser {

    private static final String LOCAL_DATE_TIME_FORMAT = "MM/dd/yyyy HH:mm";

    @Override
    public LocalDateTime parse(String date, String time) {
        date = date.concat(" ").concat(time);
        return LocalDateTime.parse(date, DateTimeFormatter.ofPattern(LOCAL_DATE_TIME_FORMAT));
    }
}
