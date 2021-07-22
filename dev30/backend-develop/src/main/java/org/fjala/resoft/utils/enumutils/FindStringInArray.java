package org.fjala.resoft.utils.enumutils;

import java.util.Arrays;

public class FindStringInArray implements FindString {
    @Override
    public <E extends Enum<E>> E findStringInArray(E[] values, String stringToFind, String type) {
        return Arrays.stream(values)
                .filter(e -> e.toString().replace("_"," ").equalsIgnoreCase(stringToFind))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("No " + type + " constant." + stringToFind));
    }
}
