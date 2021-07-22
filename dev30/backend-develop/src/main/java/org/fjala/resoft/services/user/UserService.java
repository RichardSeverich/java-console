package org.fjala.resoft.services.user;

import org.fjala.resoft.datatypes.Role;
import org.fjala.resoft.dtos.ImportDto;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    ImportDto saveFile(MultipartFile file, Role role);
}
