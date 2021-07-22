package org.fjala.resoft.datatypes;

import org.fjala.resoft.utils.enumutils.FindStringInArray;

public enum CandidateCityType {
    PANDO,
    LA_PAZ,
    COCHABAMBA,
    SANTA_CRUZ,
    BENI,
    SUCRE,
    POTOSI,
    ORURO,
    TARIJA;

    public static CandidateCityType getValueOf(String enteredValue) {
        return new FindStringInArray()
                .findStringInArray(CandidateCityType.values(),enteredValue,CandidateCityType.class.getName());
    }
}
