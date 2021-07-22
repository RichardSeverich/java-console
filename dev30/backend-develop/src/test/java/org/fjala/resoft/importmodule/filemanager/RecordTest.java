package org.fjala.resoft.importmodule.filemanager;

import org.fjala.resoft.datatypes.User;
import org.junit.Before;
import org.junit.Test;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class RecordTest {

    private Record record;

    @Before
    public void setUp() {
        record = new Record();
    }

    @Test
    public void testSetAttributesNull() {
        assertThrows(IndexOutOfBoundsException.class, () -> {
            record.setAttributes(null);
        });
    }

    @Test
    public void testGetString() {
        record.setAttributes(Map.of("name", "program"));
        assertSame("program", record.getString("name"));
    }

    @Test
    public void testGetInteger() {
        record.setAttributes(Map.of("order", "1"));
        assertSame(1, record.getInteger("order"));
    }

    @Test
    public void testGetValue() {
        LinkedHashMap<String, Object> values = new LinkedHashMap<>();
        values.put("email", "name.lastname@fundacion-jala.org");
        values.put("username", "Name Lastname");
        values.put("password", "NameLastname-1");
        record.setAttributes(Map.of("user", values));

        User expected = new User();
        expected.setEmail("name.lastname@fundacion-jala.org");
        expected.setUsername("Name Lastname");
        expected.setPassword("NameLastname-1");
        assertEquals(expected, record.getValue("user", User.class));
    }

    @Test
    public void testGetValuesAsList() {
        LinkedHashMap<String, Object> values = new LinkedHashMap<>();
        values.put("email", "name.lastname@fundacion-jala.org");
        values.put("username", "Name Lastname");
        values.put("password", "NameLastname-1");
        record.setAttributes(Map.of("users", List.of(values)));

        User expected = new User();
        expected.setEmail("name.lastname@fundacion-jala.org");
        expected.setUsername("Name Lastname");
        expected.setPassword("NameLastname-1");
        assertIterableEquals(List.of(expected), record.getValuesAsList("users", User.class));
    }

}
