package org.fjala.resoft.utils;

import java.util.Arrays;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;

@Controller
public class RulesValidator {

    @Value("${resoft.validImportFormats}")
    private String[] validImportFormats;

    @Value("${resoft.maxCsvFileSize}")
    private long maxFileSize;

    public boolean isValidPassword(String validate) {
        String regex = "(?=.*[0-9])(?=.*[a-z])(?=.*[@#$%^&+=_-])(?=\\S+$).{8,15}";
        return validate.matches(regex);
    }

    public boolean isValidFormat(String format) {
        return Arrays.asList(validImportFormats).contains(format);
    }

    public boolean isValidFileSize(long size) {
        return maxFileSize > size;
    }
}
