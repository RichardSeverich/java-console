package org.fjala.resoft.services.mappers;

import org.fjala.resoft.datatypes.Program;
import org.fjala.resoft.dtos.NewProgramDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
public class NewProgramDtoMapperTest {

    @InjectMocks
    NewProgramDtoMapper newProgramDtoMapper = new NewProgramDtoMapperImpl();

    @Test
    public void shouldReturnNewProgramDtoWhenSendProgram() {
        Program mockProgram = new Program();
        mockProgram.setId(1L);
        mockProgram.setDescription("Test description");
        mockProgram.setProgramType(org.fjala.resoft.datatypes.ProgramType.DEV);
        mockProgram.setProgramOrder(30);

        NewProgramDto expected = new NewProgramDto();
        expected.setDescription("Test description");
        expected.setProgramType(org.fjala.resoft.datatypes.ProgramType.DEV);
        expected.setProgramOrder(30);

        assertThat(expected).isEqualTo(newProgramDtoMapper.mapProgramToDto(mockProgram));
    }
}
