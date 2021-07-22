package org.fjala.resoft.controllers;

import java.util.Collection;
import org.fjala.resoft.dtos.CandidateProgramsDto;
import org.fjala.resoft.services.candidate.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/candidates/{id}")
@RestController
public class CandidateProgramsController {

    @Autowired
    private CandidateService candidateService;

    @GetMapping("/history")
    public ResponseEntity<Collection<CandidateProgramsDto>> getCandidatePrograms(@PathVariable Long id) {
        Collection<CandidateProgramsDto> response = candidateService.getCandidatePrograms(id);
        if (response.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(response);
    }
}
