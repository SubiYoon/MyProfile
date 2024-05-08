package profile.introduce.myself.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

@Slf4j
@Component
public class ProfileAuthenticationFailureHandler implements AuthenticationFailureHandler {

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
        } else if (exception instanceof BadCredentialsException || exception instanceof UsernameNotFoundException) {
            errMsg = "닉네임 혹은 비밀번호가 틀렸습니다.";
        }

        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        HashMap<String, Object> resultMap = new HashMap<>();
        resultMap.put("userInfo", null);
        resultMap.put("resultCode", 9999);
        resultMap.put("failMessage", errMsg);
        jsonObject = new JSONObject(resultMap);

        try (PrintWriter printWriter = response.getWriter()) {
            printWriter.print(jsonObject); // 최종 저장된 '사용자 정보', '사이트 정보'를 Front에 전달
            printWriter.flush();
        }
    }
}
