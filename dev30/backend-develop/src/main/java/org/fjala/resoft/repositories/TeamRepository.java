package org.fjala.resoft.repositories;

import org.fjala.resoft.datatypes.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {
    Team findByName(String name);
}
