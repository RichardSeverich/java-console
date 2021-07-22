package org.fjala.resoft.utils.datecomparator;

import java.util.Date;
import org.springframework.stereotype.Component;

@Component
public class HigherDateComparator implements DateComparator {

    @Override
    public boolean compare(Date end, Date start) {
        return end.after(start);
    }
}
