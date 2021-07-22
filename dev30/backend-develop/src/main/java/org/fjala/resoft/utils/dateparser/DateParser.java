package org.fjala.resoft.utils.dateparser;

import java.time.LocalDateTime;

public interface DateParser {
    LocalDateTime parse(String date, String time);
}
