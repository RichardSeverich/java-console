package org.fjala.resoft.services.formaters;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.stream.Collectors;
import org.fjala.resoft.datatypes.ActivityStatus;
import org.fjala.resoft.datatypes.ActivityType;
import org.fjala.resoft.dtos.ActivityJsonDto;
import org.fjala.resoft.dtos.ImportActivityJsonDto;
import org.fjala.resoft.exceptions.UploadFileException;
import org.fjala.resoft.importmodule.filemanager.Record;
import org.fjala.resoft.utils.messageparser.MessageParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class StageActivitiesFormatter implements Formatter<ImportActivityJsonDto> {

    private static final String PROGRAM = "program";
    private static final String NAME = "name";
    private static final String STAGES = "stages";
    private static final String ACTIVITIES = "activities";
    private static final String DATE = "date";
    private static final String LOCATION = "location";
    private static final String TIME = "time";
    private static final String TYPE = "type";
    private static final String STATUS = "status";
    private static final String LOCAL_DATE_FORMAT = "MM/dd/yyyy HH:mm";
    private static final String INVALID_JSON_FORMAT = "Make sure that your file has the correct format";

    @Autowired
    private MessageParser activityMessageParser;

    @Override
    public Collection<ImportActivityJsonDto> parse(Collection<Record> records) {
        try {
            return records.stream().map(record -> {
                ImportActivityJsonDto programActivities = new ImportActivityJsonDto();
                Collection<ActivityJsonDto> activities = new ArrayList<>();
                HashMap<String, Object> data = (HashMap<String, Object>) record.getAttributes().get(PROGRAM);
                programActivities.setProgramName((String) data.get(NAME));
                ArrayList<LinkedHashMap<String, Object>> stages = (ArrayList) data.get(STAGES);
                stages.forEach(stage -> {
                    activities.addAll(getActivities(stage));
                });
                programActivities.setActivityJsonDto(activities);
                return programActivities;
            }).collect(Collectors.toList());
        } catch (IllegalArgumentException | DateTimeParseException exception) {
            throw new UploadFileException(exception, activityMessageParser.parse(exception.getMessage()));
        } catch (NullPointerException e) {
            throw new UploadFileException(e, INVALID_JSON_FORMAT);
        }
    }

    private Collection<ActivityJsonDto> getActivities(LinkedHashMap<String, Object> stage) {
        ArrayList<LinkedHashMap<String, Object>> currentActivities = (ArrayList) stage.get(ACTIVITIES);
        return currentActivities.stream().map(activity -> {
            ActivityJsonDto activityDto = new ActivityJsonDto();
            activityDto.setStageName((String) stage.get(NAME));
            activityDto.setName((String) activity.get(NAME));
            activityDto.setDate(parseToLocalDateTime((String)activity.get(DATE), (String) activity.get(TIME)));
            activityDto.setLocation((String) activity.get(LOCATION));
            String type = (String) activity.get(TYPE);
            activityDto.setType(ActivityType.valueOf(type.toUpperCase()));
            String status = (String) activity.get(STATUS);
            activityDto.setStatus(ActivityStatus.valueOf(status.toUpperCase()));
            return activityDto;
        }).collect(Collectors.toList());
    }

    private LocalDateTime parseToLocalDateTime(String date, String time) {
        date = date.concat(" ").concat(time);
        return LocalDateTime.parse(date, DateTimeFormatter.ofPattern(LOCAL_DATE_FORMAT));
    }
}
