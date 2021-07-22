package org.fjala.resoft.importmodule.filemanager;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.Data;

@Data
public class Record {

    private Map<String, Object> attributes;

    public void setAttributes(Map<String, Object> attributes) {
        if (attributes == null) {
            throw new IndexOutOfBoundsException();
        }
        this.attributes = attributes;
    }

    public String getString(final String key) {
        return (String) attributes.get(key);
    }

    public Integer getInteger(final String key) {
        String value = (String) attributes.get(key);
        return Integer.valueOf(value);
    }

    public <T> List<T> getValuesAsList(final String key, Class<T> clazz) {
        List<?> objects = (List<?>) attributes.get(key);
        return objects.stream()
                .map(object -> convert(object, clazz))
                .collect(Collectors.toList());
    }

    public Object getValue(final String key) {
        return attributes.get(key);
    }

    public <T> T getValue(final String key, Class<T> clazz) {
        Object object = attributes.get(key);
        return convert(object, clazz);
    }

    private <T> T convert(Object object, Class<T> clazz) {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.convertValue(object, clazz);
    }
}
