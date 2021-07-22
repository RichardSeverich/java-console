package org.fjala.resoft.services.mappers;

import org.fjala.resoft.datatypes.Team;
import org.fjala.resoft.dtos.NewTeamDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
public class NewTeamDtoMapperTest {

    @InjectMocks
    NewTeamDtoMapper newTeamDtoMapper = new NewTeamDtoMapperImpl();

    @Test
    public void shouldReturnNewTeamDtoWhenSendTeam() {
        Team mockTeam = new Team();
        mockTeam.setId(1L);
        mockTeam.setName("Marketing");

        NewTeamDto newTeamDto = new NewTeamDto();
        newTeamDto.setName("Marketing");

        assertThat(newTeamDto).isEqualTo(newTeamDtoMapper.mapTeamToDto(mockTeam));
    }
}
