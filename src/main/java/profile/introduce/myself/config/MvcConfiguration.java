package profile.introduce.myself.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import profile.introduce.myself.security.JwtTokenInterceptor;

import java.util.concurrent.TimeUnit;

@Configuration
@SpringBootApplication
@RequiredArgsConstructor
public class MvcConfiguration implements WebMvcConfigurer {

    private final JwtTokenInterceptor jwtTokenInterceptor;

    /**
     * 정적 리소스의 위치를 맵핑시키기 위해 addResourceHanlders를 사용
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        CacheControl cacheControl = CacheControl.maxAge(60, TimeUnit.MINUTES);
        registry.addResourceHandler("/assets/**", "/admin/assets/**")
                .addResourceLocations("/assets/")
                .setCacheControl(cacheControl);
        registry.addResourceHandler("/static/**")
                .addResourceLocations("/static/")
                .setCacheControl(cacheControl);
    }

    /**
     * JWT 토큰 검사에 사용할 URL 등록 및 제외 URL 목록 등록
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry){
        registry.addInterceptor(jwtTokenInterceptor)
                .addPathPatterns("/api/admin/**")
                .addPathPatterns("/admin/**")
                .excludePathPatterns("/admin/login", "/admin/regist");
    }
}
