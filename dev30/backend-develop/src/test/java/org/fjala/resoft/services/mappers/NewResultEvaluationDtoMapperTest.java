package org.fjala.resoft.services.mappers;

import org.fjala.resoft.datatypes.Activity;
import org.fjala.resoft.datatypes.ResultEvaluation;
import org.fjala.resoft.dtos.NewResultEvaluationDto;
import org.fjala.resoft.services.mappers.NewResultEvaluationDtoMapper;
import org.fjala.resoft.services.mappers.NewResultEvaluationDtoMapperImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
public class NewResultEvaluationDtoMapperTest {

    @InjectMocks
    NewResultEvaluationDtoMapper newResultEvaluationDtoMapper = new NewResultEvaluationDtoMapperImpl();

    @Test
    public void shouldReturnNewResultEvaluationDtoWhenSendResultEvaluation() {
        Activity mockActivity = new Activity();
        mockActivity.setId(1L);
        mockActivity.setName("English Evaluation");

        ResultEvaluation mockResultEvaluation = new ResultEvaluation();
        mockResultEvaluation.setId(1L);
        mockResultEvaluation.setProgram("DEV-30");
        mockResultEvaluation.setSetEvaluation("Toefl test");
        mockResultEvaluation.setScore(83.00F);

        NewResultEvaluationDto expected = new NewResultEvaluationDto();
        expected.setProgram("DEV-30");
        expected.setSetEvaluation("Toefl test");
        expected.setScore("83.0");

        assertThat(expected).isEqualTo(newResultEvaluationDtoMapper.mapToDto(mockResultEvaluation));
    }
}
