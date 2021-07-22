package org.fjala.resoft.services.formaters;

import java.util.Collection;
import org.fjala.resoft.importmodule.filemanager.Record;

public interface Formatter<T> {
    Collection<T> parse(Collection<Record> records);
}
