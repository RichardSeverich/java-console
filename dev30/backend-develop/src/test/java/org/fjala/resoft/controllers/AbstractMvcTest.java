package org.fjala.resoft.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;

public abstract class AbstractMvcTest {

    @Autowired
    private ObjectMapper mapper;

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration.time}")
    private long expirationTime;

    protected String json(Object object) throws IOException {
        return mapper.writeValueAsString(object);
    }
}