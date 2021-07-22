package org.fjala.resoft.importmodule.filemanager;

import org.fjala.resoft.exceptions.UploadFileException;
import org.junit.Before;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class JsonManagerTest {

    private JsonManager jsonManager;

    @Before
    public void setUp() {
        jsonManager = new JsonManager();
    }

    @Test
    public void testGetDataWithFileJson() {
        String name = "hello.json";
        MockMultipartFile file = new MockMultipartFile(
                "json",
                name,
                MediaType.APPLICATION_JSON_VALUE,
                "[{\"program\": \"DEVINT-30\"}]".getBytes()
        );
        Record record = new Record();
        record.setAttributes(Map.of("program", "DEVINT-30"));
        Collection<Record> expected = new ArrayList<>();
        expected.add(record);
        Collection<Record> actual = jsonManager.getData(file);

        assertEquals(expected, actual);
    }

    @Test
    public void testGetDataWithFileThatIsNotJson() {
        String name = "hello.txt";
        MockMultipartFile file = new MockMultipartFile(
                "file",
                name,
                MediaType.TEXT_PLAIN_VALUE,
                "Hello, World!".getBytes()
        );
        Exception exception = assertThrows(UploadFileException.class, () -> {
            jsonManager.getData(file);
        });
        String actual = exception.getMessage();
        String expected = "Couldn't upload file: " + name;
        assertEquals(expected, actual);
    }
}
