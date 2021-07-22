package org.fjala.resoft.searchmodule.searchmanager;

import java.util.Collection;

public interface SearchManager<Type> {
    Collection<Type> search(String keyword);
}
