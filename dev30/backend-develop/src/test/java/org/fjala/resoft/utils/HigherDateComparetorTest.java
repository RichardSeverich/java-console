package org.fjala.resoft.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import org.fjala.resoft.utils.datecomparator.HigherDateComparator;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
public class HigherDateComparetorTest {

    HigherDateComparator higherDateComparator = new HigherDateComparator();

    @Test
    public void shouldReturnTrueIfTheEndDateIsHigher() throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MMM-yyyy", Locale.ENGLISH);
        Date mockDateStart = formatter.parse("08-April-2020");
        Date mockDateEnd = formatter.parse("18-April-2020");
        boolean result = higherDateComparator.compare(mockDateEnd, mockDateStart);
        assertThat(result).isTrue();
    }
}
