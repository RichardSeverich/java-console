package org.fjala.resoft.utils.messageparser;

import org.springframework.stereotype.Component;

@Component
public class ProgramMessageParser implements MessageParser {

    private static final String ENUM_TYPE = "No enum";
    private static final String INVALID_TYPE = "Invalid field for program type: ";
    private static final String INVALID_ORDER = "Invalid field for program order: ";
    private static final String CHECK_YOUR_FILE = ", please check your file";

    @Override
    public String parse(String message) {
        StringBuilder messageParsed = new StringBuilder();
        if (message.startsWith(ENUM_TYPE)) {
            messageParsed.append(INVALID_TYPE);
            messageParsed.append(message.substring(message.lastIndexOf(".") + 1));
        } else {
            messageParsed.append(INVALID_ORDER);
            messageParsed.append(message,
                    message.lastIndexOf(":") + 3,
                    message.length() - 1);
        }

        messageParsed.append(CHECK_YOUR_FILE);
        return messageParsed.toString();
    }
}
