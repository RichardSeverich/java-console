package org.fjala.resoft.repositories;

import java.util.Collection;
import java.util.Optional;
import org.fjala.resoft.datatypes.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    Optional<Candidate> findByDocumentValue(String documentValue);

    Optional<Candidate> findByEmail(String email);

    Collection<Candidate> findAllByProgramIdOrderByFirstNameAscLastNameAsc(Long programId);

    Boolean existsByEmail(String email);

    Boolean existsByDocumentValue(String documentValue);

    Boolean existsByCellphone(String cellphone);

    Optional<Candidate> findFirstByDocumentValueOrEmailOrCellphone(
            String documentValue, String email, String cellphone);
}
