package domain;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

/**
 * Test.
 */
public class TextLineValidatorTest {

    @Test
    public void testValidateLine() {
        Assert.assertTrue(TextLineValidator.validateLine("Carl	10"));
        Assert.assertFalse(TextLineValidator.validateLine("11	Carl"));
        Assert.assertFalse(TextLineValidator.validateLine("Carl	5	6"));
        Assert.assertFalse(TextLineValidator.validateLine("Carl	11"));
        Assert.assertFalse(TextLineValidator.validateLine("Carl	-1"));
        Assert.assertFalse(TextLineValidator.validateLine("Carl	Richard"));
    }
}
