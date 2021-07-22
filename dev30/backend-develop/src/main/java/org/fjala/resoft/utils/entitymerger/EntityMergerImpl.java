package org.fjala.resoft.utils.entitymerger;

import java.beans.FeatureDescriptor;
import java.util.Objects;
import java.util.stream.Stream;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.stereotype.Component;

@Component
public class EntityMergerImpl implements EntityMerger {

    @Override
    public <T> T merge(T source, T target) {
        BeanUtils.copyProperties(source, target, getNullProperties(source));
        return target;
    }

    private <T> String[] getNullProperties(T entity) {
        final BeanWrapper wrappedSource = new BeanWrapperImpl(entity);
        return Stream.of(wrappedSource.getPropertyDescriptors())
                .map(FeatureDescriptor::getName)
                .filter(propertyName -> wrappedSource.getPropertyValue(propertyName) == null
                        || Objects.equals(wrappedSource.getPropertyValue(propertyName), 0))
                .toArray(String[]::new);
    }
}
