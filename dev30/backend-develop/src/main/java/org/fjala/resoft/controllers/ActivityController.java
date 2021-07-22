package org.fjala.resoft.controllers;

import org.fjala.resoft.dtos.ImportDto;
import org.fjala.resoft.services.activity.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/activities")
@RestController
public class ActivityController implements ImportController {

    private static final String SUCCESSFULLY_UPLOADED = "Successfully uploaded file: ";

    @Autowired
    private ActivityService activityService;

    @Override
    public ResponseEntity<ImportDto> uploadFile(MultipartFile file) {
        ImportDto response = activityService.saveFile(file);
        response.setMessage(SUCCESSFULLY_UPLOADED + file.getOriginalFilename());
        return ResponseEntity.ok(response);
    }
}
