package profile.introduce.myself.security;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import profile.introduce.myself.utility.ItemCheck;
import profile.introduce.myself.utility.JwtUtil;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

@Slf4j
@Component
public class JwtTokenInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull Object handler) throws ProfileException, IOException {
        if (request.getRequestURI().equals("/favicon.ico")) {
            return true;
        }

        String token = null;

        Cookie[] cookies = request.getCookies();
        if (ItemCheck.isNotEmpty(cookies)) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("jwt")) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        if (ItemCheck.isNotEmpty(token)) {
            if (JwtUtil.isValidToken(token)) {
                String userId = JwtUtil.getUserIdFromToken(token);
                if (ItemCheck.isEmpty(userId)) {
                    log.debug("token isn't userId");
                    resultMsg(response, "token not found User!!");
                    throw new ProfileException(ErrorCode.AUTH_TOKEN_NOT_MATCH);
                }
                return true;
            } else {
                resultMsg(response, "token is Invalid!!");
                throw new ProfileException(ErrorCode.AUTH_TOKEN_INVALID);
            }
        } else {
            resultMsg(response, "token is NULL!!");
            throw new ProfileException(ErrorCode.AUTH_TOKEN_IS_NULL);
        }
    }

    private void resultMsg(HttpServletResponse response, String msg) throws IOException {
        // 결과값을 전달해줄 map
        HashMap<String, Object> map = new HashMap<>();


        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");

        map.put("msg", msg);

        JSONObject jsonObject = new JSONObject(map);
        try (PrintWriter printWriter = response.getWriter()) {
            printWriter.print(jsonObject); // 최종 저장된 '사용자 정보', '사이트 정보'를 Front에 전달
            printWriter.flush();
        }
    }
}
