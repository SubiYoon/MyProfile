package profile.introduce.myself.user.service;

import profile.introduce.myself.user.vo.MyStackVo;
import profile.introduce.myself.user.vo.ProfileVo;

public interface UserService {
    ProfileVo chooseProfile(String alias);
    List<MyStackVo> getStackList(String name);
}
