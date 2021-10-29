package domain;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import java.util.ArrayList;
import java.util.List;

/**
 * Test.
 */
public class TextFileReaderTest {

    @Test
    public void testReadFile() {
        List<String> actualResult = TextFileReader.readFile("src/test/resources/positive/perfect.txt");
        List<String> expectedResult = new ArrayList<>();
        expectedResult.add("Carl	10");
        expectedResult.add("Carl	10");
        expectedResult.add("Carl	10");
        expectedResult.add("Carl	10");
        expectedResult.add("Carl	10");
        expectedResult.add("Carl	10");
        expectedResult.add("Carl	10");
        expectedResult.add("Carl	10");
        expectedResult.add("Carl	10");
        expectedResult.add("Carl	10");
        expectedResult.add("Carl	10");
        expectedResult.add("Carl	10");
        Assert.assertArrayEquals(expectedResult.toArray(), actualResult.toArray());
    }

}
