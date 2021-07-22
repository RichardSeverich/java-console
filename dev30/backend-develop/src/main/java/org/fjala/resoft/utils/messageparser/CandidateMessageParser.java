package org.fjala.resoft.utils.messageparser;

import org.springframework.stereotype.Component;

@Component
public class CandidateMessageParser implements MessageParser {

    private static final String INVALID_CITY = "Invalid row for element of city value: ";
    private static final String INVALID_DOCUMENT = "Invalid row for element of document value: ";
    private static final String INVALID_STATUS = "Invalid row for element of status value: ";
    private static final String CHECK_YOUR_FILE = ", please check your file";

    private static final String NO_ENUM_CITY = "city";
    private static final String NO_ENUM_STATUS = "status";
    private static final String NO_ENUM_DOCUMENT = "document";

    @Override
    public String parse(String message) {
        StringBuilder messageParsed = new StringBuilder();
        if (message.toLowerCase().contains(NO_ENUM_CITY)) {
            messageParsed.append(INVALID_CITY).append(message.substring(message.lastIndexOf(".") + 1));
        }
        if (message.toLowerCase().contains(NO_ENUM_STATUS)) {
            messageParsed.append(INVALID_STATUS).append(message.substring(message.lastIndexOf(".") + 1));
        }
        if (message.toLowerCase().contains(NO_ENUM_DOCUMENT)) {
            messageParsed.append(INVALID_DOCUMENT).append(message.substring(message.lastIndexOf(".") + 1));
        }
        messageParsed.append(messageParsed.toString().isEmpty() ? message : "");
        messageParsed.append(CHECK_YOUR_FILE);
        return messageParsed.toString();
    }
}
