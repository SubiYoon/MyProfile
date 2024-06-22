package profile.introduce.myself.user.service;

import org.springframework.web.multipart.MultipartFile;
import profile.introduce.myself.base.ParamMap;
import profile.introduce.myself.stack.vo.StackVo;
import profile.introduce.myself.user.vo.ProfileVo;

import java.util.List;

public interface UserService {
    ProfileVo getProfile(String alias);
    List<StackVo> getStackList(String alias);

    Integer editProfileImage(String alias, MultipartFile profileImage);

    Integer updateProfile(ParamMap params);
}
