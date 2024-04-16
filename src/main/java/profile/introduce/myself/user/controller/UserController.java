package profile.introduce.myself.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import profile.introduce.myself.user.service.UserService;
import profile.introduce.myself.user.vo.ProfileVo;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping("profile")
    ProfileVo chooseProfile(String name){
        ProfileVo profileVo = userService.chooseProfile(name);
        return profileVo;
    }

}
