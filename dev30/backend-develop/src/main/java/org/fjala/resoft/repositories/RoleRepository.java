package org.fjala.resoft.repositories;

import java.util.Optional;
import org.fjala.resoft.datatypes.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(String name);
}