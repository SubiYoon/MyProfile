package profile.introduce.myself.user.service;

import profile.introduce.myself.user.vo.MyStackVo;
import profile.introduce.myself.user.vo.ProfileVo;

import java.util.List;

public interface UserService {
    ProfileVo chooseProfile(String name);
    List<MyStackVo> getStackList(String name);
}
