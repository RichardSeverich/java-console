package org.fjala.resoft.filters;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.fjala.resoft.datatypes.User;
import org.fjala.resoft.services.user.UserDetailsServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final String secret;
    private final long expirationTime;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, UserDetailsServiceImpl userService,
                                   String secret, Long expirationTime) {
        this.authenticationManager = authenticationManager;
        setFilterProcessesUrl("/auth/signin");
        userDetailsService = userService;
        this.secret = secret;
        this.expirationTime = expirationTime;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
            User credentials = mapper
                    .readValue(request.getInputStream(), User.class);
            Optional<User> searchedUser = userDetailsService.findUserByEmail(credentials.getEmail());
            if (searchedUser.isEmpty()) {
                invalidCredentials(response);
                return null;
            }
            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            credentials.getEmail(),
                            credentials.getPassword(),
                            searchedUser.get().getAuthorities())
            );
        } catch (BadCredentialsException exception) {
            invalidCredentials(response);
            return null;
        } catch (IOException exception) {
            response.setStatus(HttpStatus.BAD_REQUEST.value());
            throw new RuntimeException();
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication auth) throws IOException {
        String token = JWT.create()
                .withSubject(((User) auth.getPrincipal()).getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + expirationTime))
                .sign(Algorithm.HMAC512(this.secret.getBytes()));
        if (((User) auth.getPrincipal()).isDefaultPassword()) {
            setUpResponse(response,"token", token,
                    HttpStatus.UPGRADE_REQUIRED.value());
            return;
        }
        setUpResponse(response, "token", token, HttpStatus.OK.value());
    }

    private void invalidCredentials(HttpServletResponse response) {
        try {
            setUpResponse(response, "message", "Make sure that the email and password are correct",
                    HttpStatus.FORBIDDEN.value());
        } catch (IOException exception) {
            throw new RuntimeException();
        }
    }

    private void setUpResponse(final HttpServletResponse res, final String key, final String value, Integer httpStatus)
            throws IOException {
        res.setStatus(httpStatus);
        res.setContentType("application/json");
        res.getWriter().write(new ObjectMapper().writeValueAsString(responseBuilder(key, value)));
        res.getWriter().flush();
    }

    @JsonValue
    private Map<String, String> responseBuilder(final String key, final String value) {
        HashMap<String, String> response = new HashMap<>();
        response.put(key, value);
        return response;
    }
}