package org.fjala.resoft.services.role;

import java.util.Optional;

public interface RoleService<Role> {

    Optional<Role> findByName(String roleName);
}
