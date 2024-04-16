package profile.introduce.myself.user.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import profile.introduce.myself.user.service.UserService;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @RequestMapping("/name/{name}")
    Map<String, Object> chooseProfile(@PathVariable("name")  String name){
        String realName = "";
        if("ABCD".equals(name)){
            realName = "윤동섭";
        } else if("parkjs".equals(name)){
            realName = "박지수";
        }

        LOGGER.info("유저 조회 :: " + realName + " 조회");

        Map<String, Object> result = new HashMap<>();

        result.put("profile", userService.chooseProfile(realName));
        result.put("stack", userService.chooseStack(name));
        return result;
    }

}
