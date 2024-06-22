package profile.introduce.myself.user.controller;

import jakarta.annotation.Nullable;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import profile.introduce.myself.base.JsonParams;
import profile.introduce.myself.base.ParamMap;
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
    public Map<String, Object> userProfile( HttpServletRequest request, @PathVariable("alias")  String alias, @Nullable@RequestBody JsonParams json){

        Map<String, Object> result = new HashMap<>();

        if(request.getMethod().equals("GET")){
            ProfileVo userProfile = userService.getProfile(alias);

            if(ItemCheck.isEmpty(userProfile)){
                throw new UsernameNotFoundException("User Not Found!!");
            }

            log.info("유저 조회 :: " + userProfile.getName());

            result.put("profile", userProfile);
            result.put("stack", userService.getStackList(userProfile.getAlias()));
        } else if(request.getMethod().equals("PUT")){
            ParamMap params = ParamMap.init(json);

            params.put("originAlias", alias);

           result.put("result", userService.updateProfile(params) == 1 ? "success" : "fail");

        }
        return result;
    }

    @RequestMapping("profileImage")
    public Map<String, Object> editProfileImage(@PathVariable("alias")  String alias, MultipartFile profileImage){

        Map<String, Object> image = new HashMap<>();

        userService.editProfileImage(alias,profileImage);

        image.put("image", alias + "." + profileImage.getOriginalFilename().split("[.]")[1]);

        return image;
    }
}
