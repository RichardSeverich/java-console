package org.fjala.resoft.services.resultevaluation;

import java.util.Collection;
import org.fjala.resoft.dtos.NewResultEvaluationDto;
import org.fjala.resoft.dtos.ResultEvaluationDto;
import org.fjala.resoft.services.common.GenericImportService;

public interface ResultEvaluationService extends GenericImportService {

    boolean hasResultEvaluationError(NewResultEvaluationDto resultEvaluation);

    Collection<ResultEvaluationDto> getResultEvaluationsByCandidate(Long id);
}
