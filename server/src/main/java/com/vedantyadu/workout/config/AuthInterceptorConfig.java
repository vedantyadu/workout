package com.vedantyadu.workout.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.vedantyadu.workout.middleware.AuthInterceptor;

@Configuration
public class AuthInterceptorConfig implements WebMvcConfigurer {

    private AuthInterceptor authInterceptor;

    public AuthInterceptorConfig(AuthInterceptor authInterceptor) {
        this.authInterceptor = authInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authInterceptor)
                .addPathPatterns("/users/**");
    }
}
