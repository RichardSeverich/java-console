package org.fjala.resoft.utils.dateparser;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.springframework.stereotype.Component;

@Component
public class DateWithoutTimeParser implements  DateParser {

    private static final String LOCAL_DATE_FORMAT = "MM/dd/yyyy";

    @Override
    public LocalDateTime parse(String date, String time) {
        return LocalDate.parse(date, DateTimeFormatter.ofPattern(LOCAL_DATE_FORMAT)).atStartOfDay();
    }
}
