package profile.introduce.myself.base;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
public class AdminBaseController {

    @RequestMapping("/admin/logout")
    public Map<String, String> logout(HttpServletResponse response){
        HashMap<String, String> result = new HashMap<>();

        // JWT 토큰을 저장하고 있는 쿠키 삭제
        Cookie jwtCookie = new Cookie("PROFILE-JWT", null);
        jwtCookie.setMaxAge(0);
        jwtCookie.setPath("/");
        response.addCookie(jwtCookie);

        result.put("result", "success");
        return result;
    }
}
