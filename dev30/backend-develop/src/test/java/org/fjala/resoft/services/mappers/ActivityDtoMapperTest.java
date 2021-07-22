package org.fjala.resoft.services.mappers;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.fjala.resoft.datatypes.Activity;
import org.fjala.resoft.datatypes.ActivityStatus;
import org.fjala.resoft.dtos.ActivityDto;
import org.mockito.InjectMocks;
import org.springframework.test.context.junit4.SpringRunner;

import java.text.SimpleDateFormat;
import java.util.Locale;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
public class ActivityDtoMapperTest {

    @InjectMocks
    ActivityDtoMapper activityDtoMapper = new ActivityDtoMapperImpl();

    @Test
    public void shouldReturnActivityDtoWhenSendActivity() throws Exception {
        Activity mockActivity = new Activity();
        mockActivity.setId(1L);
        mockActivity.setName("Charla UMSS");
        mockActivity.setLocation("UMSS");
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MMM-yyyy", Locale.ENGLISH);
        String dateInString = "7-Jun-2013";
        mockActivity.setDate(formatter.parse(dateInString));
        mockActivity.setStatus(ActivityStatus.ACTIVE);

        ActivityDto expected = new ActivityDto();
        expected.setId(1L);
        expected.setName("Charla UMSS");
        expected.setLocation("UMSS");
        expected.setDate(formatter.parse(dateInString));
        expected.setStatus(ActivityStatus.ACTIVE);

        assertThat(expected).isEqualTo(activityDtoMapper.mapToDto(mockActivity));
    }
}
