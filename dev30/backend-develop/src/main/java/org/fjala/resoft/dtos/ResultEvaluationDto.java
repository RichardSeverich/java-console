package org.fjala.resoft.dtos;

import lombok.Getter;
import lombok.Setter;
import org.fjala.resoft.datatypes.Activity;

@Getter
@Setter
public class ResultEvaluationDto {

    private long id;

    private String program;

    private String activity;

    private String setEvaluation;

    private float score;

    private String title;
}
