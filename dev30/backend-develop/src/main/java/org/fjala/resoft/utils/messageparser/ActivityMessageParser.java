package org.fjala.resoft.utils.messageparser;

import org.springframework.stereotype.Component;

@Component
public class ActivityMessageParser implements MessageParser {

    private static final String DATE_ARGUMENT = "Text";
    private static final String INVALID_FIELD_FOR_DATE = "Invalid value for field date: ";
    private static final String INVALID_FIELD_FOR_GROUP = "Invalid value for field group: ";
    private static final String CHECK_YOUR_FILE = " Please check your file";

    @Override
    public String parse(String message) {
        StringBuilder messageParsed = new StringBuilder();
        if (message.startsWith(DATE_ARGUMENT)) {
            messageParsed.append(INVALID_FIELD_FOR_DATE);
            String invalidDateValue = message.substring(message.indexOf("'") + 1, message.lastIndexOf("'"));
            messageParsed.append(invalidDateValue);
        } else {
            messageParsed.append(INVALID_FIELD_FOR_GROUP);
            messageParsed.append(message.substring(message.lastIndexOf(".") + 1));
        }

        messageParsed.append(CHECK_YOUR_FILE);
        return messageParsed.toString();
    }
}
