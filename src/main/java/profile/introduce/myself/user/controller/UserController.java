package profile.introduce.myself.user.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @RequestMapping("/name/{name}")
    Map<String, Object> chooseProfile(@PathVariable("name")  String alias){

        ProfileVo userProfile = userService.chooseProfile(alias);

        LOGGER.info("유저 조회 :: " + userProfile.getName() + " 조회");

        Map<String, Object> result = new HashMap<>();

        result.put("profile", userProfile);
        result.put("stack", userService.getStackList(userProfile.getName()));
        return result;
    }

}
