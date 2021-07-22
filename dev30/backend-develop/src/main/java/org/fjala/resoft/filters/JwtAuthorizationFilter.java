package org.fjala.resoft.filters;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.fjala.resoft.datatypes.User;
import org.fjala.resoft.exceptions.InvalidUserTokenException;
import org.fjala.resoft.services.user.UserDetailsServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private final String secret;
    private static final String TOKEN_PREFIX = "Bearer ";
    private static final String AUTHORIZATION_HEADER = "Authorization";
    private final UserDetailsServiceImpl userDetailsService;

    public JwtAuthorizationFilter(AuthenticationManager authManager, String secret,
                                  UserDetailsServiceImpl userDetailsService) {
        super(authManager);
        this.secret = secret;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader(AUTHORIZATION_HEADER);
        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }
        try {
            UsernamePasswordAuthenticationToken authentication = getAuthentication(request);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            chain.doFilter(request, response);
        } catch (TokenExpiredException exception) {
            setUpResponse("Your session has expired", HttpStatus.FORBIDDEN.value(), response);
        } catch (InvalidUserTokenException exception) {
            setUpResponse("Cannot access this resource", HttpStatus.FORBIDDEN.value(), response);
        }

    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(AUTHORIZATION_HEADER);
        if (token != null) {
            String email = JWT.require(Algorithm.HMAC512(secret.getBytes()))
                    .build()
                    .verify(token.replace(TOKEN_PREFIX, ""))
                    .getSubject();
            if (email == null) {
                return null;
            }
            User client = userDetailsService.findUserByEmail(email).get();
            if (client.isDefaultPassword() && (!request.getRequestURI().equals("api/v1/users"))
                    && (!request.getMethod().equals("PATCH"))) {
                throw new InvalidUserTokenException("Cannot access this resource");
            }
            return new UsernamePasswordAuthenticationToken(email, client, client.getAuthorities());
        }

        return null;
    }

    private void setUpResponse(final String message, int responseCode,
                               HttpServletResponse response) throws IOException {
        Map<String, String> answer = new HashMap<>();
        answer.put("message", message);
        response.setStatus(responseCode);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(new ObjectMapper().writeValueAsString(answer));
    }
}