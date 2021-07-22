package org.fjala.resoft.datatypes;

import org.fjala.resoft.utils.enumutils.FindStringInArray;

public enum CandidateDocumentType {
    IDENTITY_CARD,
    PASSPORT,
    DRIVERS_LICENSE;

    public static CandidateDocumentType getValueOf(String enteredValue) {
        return new FindStringInArray()
                .findStringInArray(CandidateDocumentType.values(),enteredValue,CandidateDocumentType.class.getName());
    }
}
