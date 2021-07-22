package org.fjala.resoft.services.team;

import org.fjala.resoft.datatypes.Team;
import org.fjala.resoft.dtos.ImportTeamJsonDto;
import org.fjala.resoft.importmodule.filemanager.FileManager;
import org.fjala.resoft.repositories.TeamRepository;
import org.fjala.resoft.repositories.UserRepository;
import org.fjala.resoft.services.formaters.Formatter;
import org.fjala.resoft.services.imports.ImportService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.Assert.assertEquals;

@RunWith(MockitoJUnitRunner.class)
public class TeamServiceTest {

    @Mock
    private TeamService teamService;

    @Mock
    UserRepository userRepository;

    @Mock
    TeamRepository teamRepository;

    @Mock
    private ImportService<ImportTeamJsonDto> importService;

    @Mock
    private Formatter<ImportTeamJsonDto> importTeamJSONDTOFormatter;

    @Mock
    private FileManager jsonManager;

    @Test
    public void whenSaveTeamItShouldReturnResponse() throws Exception {
        Team team = new Team();
        team.setName("test Team");
        teamService.saveTeam("test Team");
        Mockito.when(teamRepository.findByName("test Team"))
                .thenReturn(team);
        Team result = teamRepository.findByName("test Team");
        assertEquals("test Team", result.getName());
    }
}
