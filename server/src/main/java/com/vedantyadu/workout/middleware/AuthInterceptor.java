package com.vedantyadu.workout.middleware;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.vedantyadu.workout.config.AuthConfig;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthInterceptor implements HandlerInterceptor {

    @Autowired
    private AuthConfig authConfig;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        Cookie[] cookies = request.getCookies();

        if (cookies == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }

        Cookie authCookie = null;
        for (Cookie cookie : cookies) {
            if ("auth_token".equals(cookie.getName())) {
                authCookie = cookie;
                break;
            }
        }

        if (authCookie == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }

        String authToken;

        try {
            authToken = authCookie.getValue().substring(7);
            Jws<Claims> claims = authConfig.validateAndGetClaims(authToken);
            request.setAttribute("userId", claims.getPayload().getSubject());
            return true;
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }
    }
}
