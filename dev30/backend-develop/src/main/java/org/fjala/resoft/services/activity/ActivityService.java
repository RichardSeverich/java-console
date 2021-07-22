package org.fjala.resoft.services.activity;

import java.util.Collection;
import org.fjala.resoft.dtos.ActivityDto;
import org.fjala.resoft.services.common.GenericImportService;

public interface ActivityService extends GenericImportService {
    Collection<ActivityDto> getActivitiesByProgram(Long id);
}
