package profile.introduce.myself.user.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import profile.introduce.myself.user.service.UserService;
import profile.introduce.myself.user.vo.ProfileVo;
import profile.introduce.myself.utility.ItemCheck;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping("/name/{alias}")
    public Map<String, Object> getProfile(@PathVariable("alias")  String alias, HttpServletRequest request){

        Map<String, Object> result = new HashMap<>();

        if(request.getMethod().equals("GET")){
            ProfileVo userProfile = userService.getProfile(alias);

            if(ItemCheck.isEmpty(userProfile)){
                throw new UsernameNotFoundException("User Not Found!!");
            }

            log.info("유저 조회 :: " + userProfile.getName());

            result.put("profile", userProfile);
            result.put("stack", userService.getStackList(userProfile.getAlias()));
        }
        return result;
    }

    @RequestMapping("/admin/logout")
    public Map<String, String> logout(HttpServletResponse response){
        HashMap <String, String> result = new HashMap<>();

        // JWT 토큰을 저장하고 있는 쿠키 삭제
        Cookie jwtCookie = new Cookie("jwt", null);
        jwtCookie.setMaxAge(0);
        jwtCookie.setPath("/");
        response.addCookie(jwtCookie);

        result.put("result", "success");
        return result;
    }
}
