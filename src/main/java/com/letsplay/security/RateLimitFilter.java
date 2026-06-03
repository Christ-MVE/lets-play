package com.letsplay.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class RateLimitFilter extends OncePerRequestFilter {
    private static final int LIMIT = 100;
    private static final long WINDOW_SECONDS = 60;
    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String key = request.getRemoteAddr();
        long now = Instant.now().getEpochSecond();
        Bucket bucket = buckets.compute(key, (ip, existing) -> {
            if (existing == null || now - existing.windowStart > WINDOW_SECONDS) {
                return new Bucket(now);
            }
            return existing;
        });

        if (bucket.count.incrementAndGet() > LIMIT) {
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setContentType("application/json");
            response.getWriter().write("{\"message\":\"Too many requests. Try again later.\"}");
            return;
        }

        filterChain.doFilter(request, response);
    }

    private static class Bucket {
        private final long windowStart;
        private final AtomicInteger count = new AtomicInteger(0);

        private Bucket(long windowStart) {
            this.windowStart = windowStart;
        }
    }
}
