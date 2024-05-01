package profile.introduce.myself.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;

@Slf4j
@Component
public class ProfileAuthenticationFailureHandler implements AuthenticationFailureHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
        JSONObject jsonObject;
        String errMsg = "";

        if (exception instanceof AuthenticationServiceException) {
            errMsg = "로그인 정보가 일치하지 않습니다.";
        } else if (exception instanceof LockedException) {
            errMsg = "계정이 잠겨 있습니다.";
        } else if (exception instanceof DisabledException) {
            errMsg = "계정이 비활성화되었습니다.";
        } else if (exception instanceof AccountExpiredException) {
            errMsg = "계정이 만료되었습니다.";
        } else if (exception instanceof CredentialsExpiredException) {
            errMsg = "인증 정보가 만료되었습니다.";
        }

        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        HashMap<String, Object> resultMap = new HashMap<>();
        resultMap.put("userInfo", null);
        resultMap.put("resultCode", 9999);
        resultMap.put("failMessage", errMsg);
        jsonObject = new JSONObject(resultMap);

        objectMapper.writeValue(response.getWriter(), jsonObject);
    }
}
