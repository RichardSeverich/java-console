package org.fjala.resoft.services.program;

import java.util.Collection;
import java.util.Date;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.fjala.resoft.datatypes.Program;
import org.fjala.resoft.dtos.EditProgramDto;
import org.fjala.resoft.dtos.ImportDto;
import org.fjala.resoft.dtos.NewProgramDto;
import org.fjala.resoft.dtos.ProgramDto;
import org.fjala.resoft.dtos.StageDto;
import org.fjala.resoft.exceptions.BadRequestException;
import org.fjala.resoft.importmodule.filemanager.FileManager;
import org.fjala.resoft.repositories.ProgramRepository;
import org.fjala.resoft.services.formaters.Formatter;
import org.fjala.resoft.services.imports.ImportService;
import org.fjala.resoft.services.mappers.NewProgramDtoMapper;
import org.fjala.resoft.services.mappers.ProgramDtoMapper;
import org.fjala.resoft.services.mappers.StageDtoMapper;
import org.fjala.resoft.utils.datecomparator.DateComparator;
import org.fjala.resoft.utils.entitymerger.EntityMerger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@AllArgsConstructor
public class ProgramServiceImpl implements ProgramService<ProgramDto, NewProgramDto, StageDto> {

    private static final String INVALID_START_DATE = "Start date must be lower than the end date";

    private static final String EMPTY_START_DATE = "Please set a start date for the program";

    private static final String INVALID_END_DATE = "End date must be higher that the start date";

    @Autowired
    private final ProgramRepository programRepository;

    @Autowired
    private final NewProgramDtoMapper newProgramDtoMapper;

    @Autowired
    private final ProgramDtoMapper programDtoMapper;

    @Autowired
    Formatter<Program> formatter;

    @Autowired
    ImportService<Program> importService;

    @Autowired
    private final StageDtoMapper stageDtoMapper;

    @Autowired
    private final FileManager csvManager;

    @Autowired
    private final DateComparator dateComparator;

    @Autowired
    private final EntityMerger entityMerger;

    @Override
    public ProgramDto save(NewProgramDto newProgramDto) {
        Program program = programRepository.save(newProgramDtoMapper.mapDtoToProgram(newProgramDto));
        return programDtoMapper.mapProgramToDto(program);
    }

    @Override
    public Collection<ProgramDto> getAll() {
        return programRepository.findAll()
                .stream()
                .map(programDtoMapper::mapProgramToDto)
                .collect(Collectors.toList());
    }

    @Override
    public Collection<StageDto> getProgramStages(Long id) {
        return programRepository.findById(id).get().getStages()
                .stream()
                .map(stageDtoMapper::mapToStageDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<ProgramDto> get(Long id) {
        return programRepository.findById(id).map(programDtoMapper::mapProgramToDto);
    }

    @Override
    public ProgramDto update(Long id, EditProgramDto editProgram) {
        Program program = programRepository.findById(id).get();
        Date startDate = editProgram.getStartDate();
        Date endDate = editProgram.getEndDate();

        if (!isNull(startDate) || !isNull(endDate)) {
            verifyDates(program.getStartDate(), program.getEndDate(), startDate, endDate);
        }

        Program mergedProgram = (Program) entityMerger.merge(editProgram, program);
        mergedProgram.setStartAutomatically(true);
        return programDtoMapper.mapProgramToDto(programRepository.save(mergedProgram));
    }

    @Override
    public void delete(Long id) {
        programRepository.deleteById(id);
    }

    @Override
    public boolean exist(long id) {
        return programRepository.existsById(id);
    }

    @Override
    public ImportDto saveFile(MultipartFile file) {
        importService.setFileManager(csvManager);
        importService.setFormatter(formatter);
        int saved = 0;
        Collection<Program> programs = importService.format(file);
        for (Program program: programs) {
            if (programRepository.findByName(program.getName()) == null) {
                programRepository.save(program);
                saved++;
            }
        }
        ImportDto result = new ImportDto();
        result.setSaved(saved);
        result.setTotal(programs.size());
        result.setFailed(programs.size() - saved);
        return result;
    }

    private boolean isNull(Date date) {
        return date == null;
    }

    private void verifyDates(Date programStartDate, Date programEndDate, Date startDate, Date endDate) {
        if (isNull(programStartDate) && isNull(startDate)) {
            throw new BadRequestException(EMPTY_START_DATE);
        }

        if ((!isNull(startDate) && !isNull(endDate))
                && !dateComparator.compare(endDate, startDate)) {
            throw new BadRequestException(INVALID_START_DATE);
        }

        if ((!isNull(programStartDate) && !isNull(endDate) && isNull(startDate))
                && !dateComparator.compare(endDate, programStartDate)) {
            throw new BadRequestException(INVALID_END_DATE);
        }

        if ((!isNull(programEndDate) && !isNull(startDate) && isNull(endDate))
                && !dateComparator.compare(programEndDate, startDate)) {
            throw new BadRequestException(INVALID_START_DATE);
        }
    }
}
