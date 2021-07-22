package org.fjala.resoft.services.team;

import org.fjala.resoft.dtos.ImportDto;
import org.springframework.web.multipart.MultipartFile;

public interface TeamService {
    ImportDto saveFile(MultipartFile file);

    void saveTeam(String name);
}
