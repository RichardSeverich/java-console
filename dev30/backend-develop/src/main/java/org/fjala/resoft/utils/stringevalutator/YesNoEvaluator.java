package org.fjala.resoft.utils.stringevalutator;

import org.springframework.stereotype.Component;

@Component
public class YesNoEvaluator implements StringEvaluator {

    @Override
    public boolean evaluate(String string) {
        if (string.equalsIgnoreCase("Yes") || string.equalsIgnoreCase("No")) {
            return string.equalsIgnoreCase("Yes") ? true : false;
        } else {
            throw new IllegalArgumentException("Not valid Yes/No argument");
        }
    }
}
