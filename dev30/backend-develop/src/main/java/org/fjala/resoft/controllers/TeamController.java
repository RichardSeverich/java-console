package org.fjala.resoft.controllers;

import org.fjala.resoft.dtos.ImportDto;
import org.fjala.resoft.services.team.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/teams")
public class TeamController implements ImportController {
    private static final String SUCCESSFULLY_UPLOADED_TEAMS_USERS =
            "Successfully uploaded Teams with Users file: ";

    @Autowired
    TeamService teamService;

    @Override
    public ResponseEntity<ImportDto> uploadFile(@RequestParam("file") MultipartFile file) {
        ImportDto response = teamService.saveFile(file);
        response.setMessage(SUCCESSFULLY_UPLOADED_TEAMS_USERS + file.getOriginalFilename());
        return ResponseEntity.ok(response);
    }
}
