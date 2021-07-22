package org.fjala.resoft.utils.entitymerger;


public interface EntityMerger {
    <T> T merge(T source, T target);
}

