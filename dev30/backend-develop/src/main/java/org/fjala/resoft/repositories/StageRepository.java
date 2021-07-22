package org.fjala.resoft.repositories;

import java.util.List;
import org.fjala.resoft.datatypes.Program;
import org.fjala.resoft.datatypes.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StageRepository extends JpaRepository<Stage, Long> {
    Stage findByNameAndProgram(String name, Program program);

    List<Stage> findAllByProgram(Program program);

    List<Stage> findAllByProgramId(Long id);
}
