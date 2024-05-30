package com.stackroute.authenticationservice.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtFilter extends GenericFilterBean {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        final HttpServletRequest request = (HttpServletRequest) servletRequest;
        final HttpServletResponse response = (HttpServletResponse) servletResponse;

        final String authHeader = request.getHeader("authorization");

        if ("OPTIONS".equals(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            filterChain.doFilter(request, response);
        } else {
            /*
             * Check if authHeader is null or does not start with "Bearer " then throw Exception
             */
            if(authHeader == null || !authHeader.startsWith("Bearer ")){
                throw new ServletException("An exception occurred");
            }

            /*
             * Extract token from authHeader
             */
            final String token = authHeader.substring(7);

            /*
             * Obtain Claims by parsing the token with the signing key value "secret"
             */
            Claims claims = Jwts.parser().setSigningKey("secret").parseClaimsJws(token).getBody();

            /*
             * Set Claims object obtained in previous step with key "claims" as request attribute
             */
            request.setAttribute("claims",claims);

            /*
             * Set user id passed as request parameter with key "user" as request attribute
             */
            request.setAttribute("blog",servletRequest.getParameter("id"));


            filterChain.doFilter(request, response);
        }
    }


}
