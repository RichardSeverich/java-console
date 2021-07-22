package org.fjala.resoft.controllers;

import java.util.Collection;
import java.util.List;
import org.fjala.resoft.dtos.EditStageDto;
import org.fjala.resoft.dtos.ImportDto;
import org.fjala.resoft.dtos.StageDto;
import org.fjala.resoft.services.stage.StageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/stages")
public class StageController {

    private static final String SUCCESSFULLY_UPLOADED_PROGRAM_STAGES =
            "Successfully uploaded programs stages file: ";

    @Autowired
    private StageService<StageDto> stageService;

    @PostMapping("/upload")
    public ResponseEntity<ImportDto> uploadJsonFile(@RequestParam("file") MultipartFile file) {
        ImportDto response = stageService.saveFile(file);
        response.setMessage(SUCCESSFULLY_UPLOADED_PROGRAM_STAGES + file.getOriginalFilename());
        return ResponseEntity.ok(response);
    }

    @PutMapping
    public ResponseEntity<Collection<StageDto>> updateProgramStages(@RequestBody List<EditStageDto> stages) {
        return ResponseEntity.ok(stageService.update(stages));
    }
}
