package org.fjala.resoft.services.team;

import java.util.Collection;
import java.util.Date;
import java.util.Optional;
import org.fjala.resoft.datatypes.Team;
import org.fjala.resoft.datatypes.User;
import org.fjala.resoft.dtos.ImportDto;
import org.fjala.resoft.dtos.ImportTeamJsonDto;
import org.fjala.resoft.dtos.UserJsonDto;
import org.fjala.resoft.importmodule.filemanager.FileManager;
import org.fjala.resoft.repositories.TeamRepository;
import org.fjala.resoft.repositories.UserRepository;
import org.fjala.resoft.services.formaters.Formatter;
import org.fjala.resoft.services.imports.ImportService;
import org.fjala.resoft.services.mappers.NewProgramDtoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class TeamServiceImpl implements TeamService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private NewProgramDtoMapper newProgramDtoMapper;

    @Autowired
    private ImportService<ImportTeamJsonDto> importService;

    @Autowired
    private Formatter<ImportTeamJsonDto> importTeamJsonDtoFormatter;

    @Autowired
    private FileManager jsonManager;

    public Iterable<User> saveAll(Collection<User> users) {
        return userRepository.saveAll(users);
    }

    public void saveTeam(String name) {
        Team team = new Team();
        team.setName(name);
        team.setCreatedAt(new Date());
        teamRepository.save(team);
    }

    protected void updateUserTeam(ImportTeamJsonDto userUpdate, Team team) {
        for (UserJsonDto userJsonDto : userUpdate.getUsers()) {
            Optional<User> user = userRepository.findByEmail(userJsonDto.getEmail());
            if (user.isPresent()) {
                user.get().setTeam(team);
                userRepository.save(user.get());
            }
        }
    }

    @Override
    public ImportDto saveFile(MultipartFile file) {
        importService.setFileManager(jsonManager);
        importService.setFormatter(importTeamJsonDtoFormatter);
        Collection<ImportTeamJsonDto> teams = importService.format(file);
        int successfullySaved = 0;
        for (ImportTeamJsonDto dto : teams) {
            if (teamRepository.findByName(dto.getTeam().getName()) == null) {
                saveTeam(dto.getTeam().getName());
                successfullySaved++;
            }
            Team team = teamRepository.findByName(dto.getTeam().getName());
            updateUserTeam(dto, team);
        }
        ImportDto response = new ImportDto();
        response.setSaved(successfullySaved);
        response.setFailed(teams.size() - successfullySaved);
        response.setTotal(teams.size());
        return response;
    }
}
