package org.fjala.resoft.utils.enumutils;

public interface FindString {
    public <E extends Enum<E>> E findStringInArray(E[] values, String stringToFind, String type);
}
