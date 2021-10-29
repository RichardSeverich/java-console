package domain;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

/**
 * Test.
 */
public class TextFileProcessorTest {

    @Test
    public void testPerfectFile() throws TextFileException {
        Map<String,List<String>> actualResult = TextFileProcessor.process("src/test/resources/positive/perfect.txt");
        List<String> carlScores = new ArrayList<>();
        carlScores.add("10");
        carlScores.add("10");
        carlScores.add("10");
        carlScores.add("10");
        carlScores.add("10");
        carlScores.add("10");
        carlScores.add("10");
        carlScores.add("10");
        carlScores.add("10");
        carlScores.add("10");
        carlScores.add("10");
        carlScores.add("10");
        Map<String,List<String>> expectedResult = new HashMap<>(); 
        expectedResult.put("Carl", carlScores);
        Assert.assertTrue(actualResult.equals(expectedResult));
    }

    @Test(expected = TextFileException.class)
    public void testEmptyFile() throws TextFileException {
        Map<String,List<String>> actualResult = TextFileProcessor.process("src/test/resources/negative/empty.txt");
    }

    @Test(expected = TextFileException.class)
    public void testFreeText() throws TextFileException {
        Map<String,List<String>> actualResult = TextFileProcessor.process("src/test/resources/negative/free-text.txt");
    }

    @Test(expected = TextFileException.class)
    public void testExtraScore() throws TextFileException {
        Map<String,List<String>> actualResult = TextFileProcessor.process("src/test/resources/negative/extra-score.txt");
    }

    @Test(expected = TextFileException.class)
    public void testInvalidScore() throws TextFileException {
        Map<String,List<String>> actualResult = TextFileProcessor.process("src/test/resources/negative/invalid-score.txt");
    }

    @Test(expected = TextFileException.class)
    public void testNegative() throws TextFileException {
        Map<String,List<String>> actualResult = TextFileProcessor.process("src/test/resources/negative/negative.txt");
    }

    @Test(expected = TextFileException.class)
    public void testLessScores() throws TextFileException {
        Map<String,List<String>> actualResult = TextFileProcessor.process("src/test/resources/negative/less-score.txt");
    }

    @Test(expected = TextFileException.class)
    public void testNonExistentFile() throws TextFileException {
        Map<String,List<String>> actualResult = TextFileProcessor.process("src/test/resources/positive/non-existent-file.txt");
    }

}
