package profile.introduce.myself.user.service;

import profile.introduce.myself.user.vo.MyStackVo;
import profile.introduce.myself.user.vo.ProfileVo;

public interface UserService {
    ProfileVo chooseProfile(String name);
    MyStackVo chooseStack(String name);
}
