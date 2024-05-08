package profile.introduce.myself.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import profile.introduce.myself.utility.JwtUtil;

import java.io.PrintWriter;
import java.util.HashMap;

@Slf4j
@Component
public class ProfileAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @SneakyThrows
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        UserVo userVo = (UserVo) authentication.getPrincipal();

        objectMapper.registerModule(new JavaTimeModule());
        JSONObject userVoOjbect = new JSONObject(objectMapper.writeValueAsString(userVo));

        HashMap<String, Object> map = new HashMap<>();
        JSONObject jsonObject;

        map.put("userInfo", userVoOjbect);
        map.put("resultCode", 200);
        map.put("failMessage", null);
        jsonObject = new JSONObject(map);

        // JWT토큰 생성
        String token = JwtUtil.createJwtToken(userVo);
        jsonObject.put("token", token);

        // 쿠키에 토큰 저장
        Cookie jwtCookie = new Cookie("PROFILE-JWT", token);
        jwtCookie.setHttpOnly(true); // JavaScript에서 쿠키 접근 할 수 없도록 설정
        jwtCookie.setPath("/"); // 모든경로에서 쿠키 접근할 수 있게 설정
        response.addCookie(jwtCookie);

        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        try (PrintWriter printWriter = response.getWriter()) {
            printWriter.print(jsonObject); // 최종 저장된 '사용자 정보', '사이트 정보'를 Front에 전달
            printWriter.flush();
        }
    }
}
