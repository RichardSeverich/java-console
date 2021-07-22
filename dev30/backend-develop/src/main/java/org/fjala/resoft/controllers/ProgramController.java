package org.fjala.resoft.controllers;

import java.net.URI;
import java.util.Collection;
import javax.persistence.OrderBy;
import javax.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.fjala.resoft.dtos.EditProgramDto;
import org.fjala.resoft.dtos.ImportDto;
import org.fjala.resoft.dtos.NewProgramDto;
import org.fjala.resoft.dtos.ProgramDto;
import org.fjala.resoft.dtos.StageDto;
import org.fjala.resoft.exceptions.ProgramNotFoundException;
import org.fjala.resoft.services.program.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RequestMapping("/programs")
@RestController
@Slf4j
public class ProgramController implements ImportController {

    @Autowired
    private ProgramService<ProgramDto, NewProgramDto, StageDto> programService;

    private static final String SUCCESSFULLY_UPLOADED_PROGRAMS =
            "Successfully uploaded programs file: ";

    private static final String PROGRAM_NOT_FOUND = "Program not found";

    @PostMapping
    public ResponseEntity<ProgramDto> create(@RequestBody @Valid NewProgramDto newProgramDto) {
        ProgramDto programDto = programService.save(newProgramDto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(programDto.getId()).toUri();

        return ResponseEntity.created(location).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProgramDto> update(@PathVariable final Long id,
                                             @RequestBody final EditProgramDto editProgram) {
        if (!programService.exist(id)) {
            throw new ProgramNotFoundException(PROGRAM_NOT_FOUND);
        }

        return ResponseEntity.ok(programService.update(id, editProgram));
    }

    @GetMapping
    public ResponseEntity<Collection<ProgramDto>> getAll() {
        return ResponseEntity.ok(programService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProgramDto> get(@PathVariable Long id) {
        if (programService.get(id).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok(programService.get(id).get());
    }

    @OrderBy("order ASC")
    @GetMapping("/{id}/stages")
    public ResponseEntity<Collection<StageDto>> getStages(@PathVariable Long id) {
        if (programService.get(id).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(programService.getProgramStages(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        if (!programService.exist(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        programService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ImportDto> uploadFile(MultipartFile file) {
        ImportDto response = programService.saveFile(file);
        response.setMessage(SUCCESSFULLY_UPLOADED_PROGRAMS + file.getOriginalFilename());
        return ResponseEntity.ok(response);
    }
}
