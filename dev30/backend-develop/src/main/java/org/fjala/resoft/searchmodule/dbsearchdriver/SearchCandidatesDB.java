package org.fjala.resoft.searchmodule.dbsearchdriver;

import java.util.Collection;
import org.fjala.resoft.datatypes.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SearchCandidatesDB extends JpaRepository<Candidate, Long> {
    Collection<Candidate>
        findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrFullNameContainingIgnoreCase(
                String firstName, String lastName, String fullName);
}
