package org.fjala.resoft.services.program;

import java.util.Collection;
import java.util.Optional;
import org.fjala.resoft.dtos.EditProgramDto;
import org.fjala.resoft.services.common.GenericImportService;

public interface ProgramService<Type, TypeNew, StageDTO> extends GenericImportService {

    Type save(TypeNew newProgramDto);

    Collection<Type> getAll();

    Collection<StageDTO> getProgramStages(Long id);

    Optional<Type> get(Long id);

    Type update(Long id, EditProgramDto editProgram);

    void delete(Long id);

    boolean exist(long id);
}
