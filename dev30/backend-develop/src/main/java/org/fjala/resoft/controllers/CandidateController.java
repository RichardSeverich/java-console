package org.fjala.resoft.controllers;

import java.util.Collection;
import java.util.Optional;
import org.fjala.resoft.dtos.CandidateDto;
import org.fjala.resoft.dtos.CandidateSearchDto;
import org.fjala.resoft.dtos.ImportDto;
import org.fjala.resoft.services.candidate.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/candidates")
@RestController
public class CandidateController implements ImportController {

    @Autowired
    private CandidateService candidateService;

    private static final String SUCCESSFULLY_UPLOADED_CANDIDATES =
            "Successfully uploaded candidates file: ";

    @Override
    public ResponseEntity<ImportDto> uploadFile(MultipartFile file) {
        ImportDto response = candidateService.saveFile(file);
        response.setMessage(SUCCESSFULLY_UPLOADED_CANDIDATES + file.getOriginalFilename());
        return ResponseEntity.ok(response);
    }

    @GetMapping("{id}")
    public ResponseEntity<CandidateDto> get(@PathVariable("id") Long id) {
        Optional<CandidateDto> candidate = candidateService.get(id);
        if (candidate.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(candidateService.get(id).get());
    }

    @GetMapping("/search/{keyword}")
    public ResponseEntity<Collection<CandidateSearchDto>> getActivitiesByProgram(@PathVariable String keyword) {
        Collection<CandidateSearchDto> responses = candidateService.searchCandidatesFullName(keyword);
        if (responses.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(responses);
    }
}
