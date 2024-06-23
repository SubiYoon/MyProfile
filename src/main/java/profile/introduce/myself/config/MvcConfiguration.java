package profile.introduce.myself.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@SpringBootApplication
@RequiredArgsConstructor
public class MvcConfiguration implements WebMvcConfigurer {

}
