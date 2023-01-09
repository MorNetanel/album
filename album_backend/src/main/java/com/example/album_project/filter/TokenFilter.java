package com.example.album_project.filter;

import com.auth0.jwt.JWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Order(2)
@Slf4j
public class TokenFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {

            String token = request.getHeader("authorization")
                    .replace("Bearer ", "");
           

            String email = JWT.decode(token).getClaim("email").asString();
            String username = JWT.decode(token).getClaim("username").asString();
            String appUserType = JWT.decode(token).getClaim("client type").asString();
            log.info("succeed to decode token for user : {}" , username );
            filterChain.doFilter(request, response);





        }catch (Exception e){
            log.error("Failed to decode token");
            response.setStatus(401);

        }


    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        return path.startsWith("/auth/login") || path.startsWith("/auth/register") || path.startsWith("/home") ;
    }
}
