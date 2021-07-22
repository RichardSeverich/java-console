package org.fjala.resoft.repositories;

import java.util.Collection;
import org.fjala.resoft.datatypes.CandidateStatusProgram;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateStatusProgramRepository extends JpaRepository<CandidateStatusProgram, Long> {
    Collection<CandidateStatusProgram> findAllByCandidateId(Long candidateId);

    Collection<CandidateStatusProgram> findAllByDocumentValue(String documentValue);
}
