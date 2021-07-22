package org.fjala.resoft.repositories;

import java.util.Collection;
import java.util.Optional;
import org.fjala.resoft.datatypes.ResultEvaluation;
import org.fjala.resoft.dtos.ResultEvaluationDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultEvaluationRepository extends JpaRepository<ResultEvaluation, Long> {
    Optional<ResultEvaluation> findByEmail(String email);

    Collection<ResultEvaluation> findAllByCandidateId(Long candidateId);
}
