package org.fjala.resoft.controllers;

import java.util.Collection;
import org.fjala.resoft.dtos.CandidateListDto;
import org.fjala.resoft.services.candidate.CandidateService;
import org.fjala.resoft.services.program.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/programs/{id}/candidates")
@RestController
public class ProgramCandidateController {

    @Autowired
    private CandidateService candidateService;

    @Autowired
    private ProgramService programService;

    @GetMapping()
    public ResponseEntity<Collection<CandidateListDto>> getCandidatesByProgram(@PathVariable Long id) {
        if (programService.get(id).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        return ResponseEntity.ok(candidateService.getCandidatesFullNameAscByProgram(id));
    }
}
