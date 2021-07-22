package org.fjala.resoft.controllers;

import java.util.Collection;
import org.fjala.resoft.dtos.ResultEvaluationDto;
import org.fjala.resoft.services.resultevaluation.ResultEvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequestMapping("/candidates/{id}")
@RestController
public class CandidateEvaluationResultController {

    @Autowired
    private ResultEvaluationService resultEvaluationService;

    @GetMapping("/result-evaluations")
    public ResponseEntity<Collection<ResultEvaluationDto>> getResultEvaluationByCandidate(@PathVariable Long id) {
        Collection<ResultEvaluationDto> response = resultEvaluationService.getResultEvaluationsByCandidate(id);
        if (response.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(response);
    }
}
