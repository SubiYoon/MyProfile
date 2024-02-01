package profile.introduce.myself.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    /**
     * 정적 자원에 대해 보안을 적용하지 않도록 설정
     */
    @Bean
    WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring()
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    /**
     * Spring Security 설정
     * <ul>
     *     <li>csrf 방지 기능 비활성화</li>
     *     <li>`/admin/**` 페이지만 인증 필요하게 설정</li>
     *     <li>로그인 성공시 `/`로 이동</li>
     *     <li>로그아웃시 세션삭제 및 쿠키삭제</li>
     * </ul>
     */
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                //인증 인가가 필요한 URL을 지정
                .authorizeHttpRequests(requests -> requests
                        //특정 패턴의 URL 인증이 필요함을 표시(authenticated())
                        .requestMatchers( "/admin/**").authenticated()
                        //나머지 요청은 전부 허용
                        .anyRequest().permitAll()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                //로그인 폼 방식 적용
                .formLogin(form -> form
                        //로그인 폼 URL
                        .loginPage("/login")
                        .loginProcessingUrl("/profile/login")
                        //성공시 "/"페이지로 이동
                        .defaultSuccessUrl("/", true)
                        //인증 인가 필요없이 허용
                        .permitAll()
                )
                //로그아웃에 대한 정보
                .logout()
                .logoutUrl("/profile/logout")
                .invalidateHttpSession(true).deleteCookies("JSESSIONID");

        return httpSecurity.build();
    }

    @Bean
    public CorsConfigurationSource corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        // 쿠키 or 인증토큰을 포함하는 요청을 승인여부
        config.setAllowCredentials(true);
        // 요청 가능한 도메인 설정
        config.setAllowedOrigins(Collections.singletonList("*"));
        // 요청시 받고을 수 있는 헤더 설정
        config.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization", "Content-Length", "X-Requested-Width", "X-XSRF-token"));
        // 요청시 가능한 Method 서정
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);

        return source;
    }
}
