package org.fjala.resoft.datatypes;

import org.fjala.resoft.utils.enumutils.FindStringInArray;

public enum CandidateStatusType {
    LICENSED,
    ACTIVE,
    DISMISSED;

    public static CandidateStatusType getValueOf(String enteredValue) {
        return new FindStringInArray()
                .findStringInArray(CandidateStatusType.values(),enteredValue,CandidateStatusType.class.getName());
    }
}

