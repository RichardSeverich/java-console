package org.fjala.resoft.controllers;

import java.util.Collection;
import org.fjala.resoft.dtos.ActivityDto;
import org.fjala.resoft.services.activity.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/programs")
@RestController
public class ProgramActivitiesController {

    @Autowired
    private ActivityService activityService;

    @GetMapping("/{id}/activities")
    public ResponseEntity<Collection<ActivityDto>> getActivitiesByProgram(@PathVariable Long id) {
        Collection<ActivityDto> responses = activityService.getActivitiesByProgram(id);
        if (responses.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(responses);
    }
}
