package mk.ukim.finki.wp.lab_emt.config;

import mk.ukim.finki.wp.lab_emt.filter.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class JwtWebSecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public JwtWebSecurityConfig(@Lazy JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**",
                                "/swagger-resources/**"
                        ).permitAll()
                        .requestMatchers("/api/user/login", "/api/user/register").permitAll()

                        .requestMatchers(HttpMethod.GET, "/api/user", "/api/user/**").authenticated()

                        .requestMatchers(HttpMethod.PUT, "/api/user/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/user/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/api/accommodations", "/api/accommodations/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/accommodations").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/accommodations/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/accommodations/**").hasRole("ADMIN")


                        .requestMatchers(HttpMethod.GET, "/api/hosts", "/api/hosts/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/hosts").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/hosts/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/hosts/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/api/countries", "/api/countries/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/countries").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/countries/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/countries/**").hasRole("ADMIN")

                        .anyRequest().authenticated()
                )
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:3000",
                "http://frontend.local:8080"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}