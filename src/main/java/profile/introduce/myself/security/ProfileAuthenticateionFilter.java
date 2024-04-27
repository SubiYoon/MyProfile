package profile.introduce.myself.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Data;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.util.StringUtils;

import java.io.IOException;

public class ProfileAuthenticateionFilter extends AbstractAuthenticationProcessingFilter {

    private ObjectMapper objectMapper = new ObjectMapper();

    public ProfileAuthenticateionFilter(){
        // 로그인 시도시에 필터 동작
        super(new AntPathRequestMatcher("/api/admin/login"));
    }
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {

        if(!"POST".equals(request.getMethod())){
            throw new IllegalStateException("Authentication is supported only 'POST'");
        }

        // body를 UserVo에 맵핑
        accountVo accountVo = objectMapper.readValue(request.getReader(), accountVo.class);

        if(!StringUtils.hasLength(accountVo.getName()) || !StringUtils.hasLength(accountVo.getPassword())){
            throw new IllegalArgumentException("userName or userPassword is empty!!");
        }

        // 토큰생성
        ProfileAuthenticationToken token = new ProfileAuthenticationToken(
                accountVo.getName(),
                accountVo.getPassword()
        );

        // 인증처리
        Authentication authentication = getAuthenticationManager().authenticate(token);

        return authentication;
    }

    @Data
    public static class accountVo{
        private String name;
        private String password;
    }
}
