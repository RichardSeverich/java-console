package org.fjala.resoft.controllers;

import org.fjala.resoft.dtos.ImportDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

public interface ImportController {

    @PostMapping("/upload")
    ResponseEntity<ImportDto> uploadFile(@RequestParam("file") MultipartFile file);
}
