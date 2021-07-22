package org.fjala.resoft.services.formaters;

import java.util.Collection;
import java.util.stream.Collectors;
import org.fjala.resoft.dtos.RegisterUserDto;
import org.fjala.resoft.importmodule.filemanager.Record;
import org.springframework.stereotype.Component;

@Component
public class UserFormatter implements Formatter<RegisterUserDto> {

    private static final String ACCOUNT = "account";
    private static final String USERNAME = "user name";
    private static final String PASSWORD = "password";

    @Override
    public Collection<RegisterUserDto> parse(Collection<Record> records) {
        return records.stream().map(record -> {
            RegisterUserDto user = new RegisterUserDto();
            user.setEmail(record.getString(ACCOUNT));
            user.setUsername(record.getString(USERNAME));
            user.setPassword(record.getString(PASSWORD));
            return user;
        }).collect(Collectors.toList());
    }
}
