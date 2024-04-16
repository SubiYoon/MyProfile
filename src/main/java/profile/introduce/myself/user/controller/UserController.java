package profile.introduce.myself.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import profile.introduce.myself.user.service.UserService;
import profile.introduce.myself.user.vo.ProfileVo;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping("/name/{name}")
    Map<String, Object> chooseProfile(@PathVariable("name")  String name){
        String realName = "";
        if("ABCD".equals(name)){
            realName = "윤동섭";
        } else if("parkjs".equals(name)){
            realName = "박지수";
        }

        Map<String, Object> result = new HashMap<>();

        result.put("profile", userService.chooseProfile(realName));
        result.put("stack", userService.chooseStack(name));
        return result;
    }

}
