package org.fjala.resoft.controllers;

import org.fjala.resoft.dtos.ImportDto;
import org.fjala.resoft.services.resultevaluation.ResultEvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/result-evaluations")
public class ResultEvaluationController implements ImportController {

    @Autowired
    private ResultEvaluationService evaluationService;

    private static final String SUCCESSFULLY_UPLOADED_EVALUATIONS =
            "Successfully uploaded Result Evaluations file: ";

    @Override
    public ResponseEntity<ImportDto> uploadFile(MultipartFile file) {
        ImportDto response = evaluationService.saveFile(file);
        response.setMessage(SUCCESSFULLY_UPLOADED_EVALUATIONS + file.getOriginalFilename());
        return ResponseEntity.ok(response);
    }
}
