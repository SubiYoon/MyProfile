package profile.introduce.myself.user.controller;

import jakarta.servlet.http.HttpServletRequest;
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
@RequestMapping("/name/{alias}")
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping("")
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
}
