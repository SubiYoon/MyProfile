package profile.introduce.myself.user.service;

import profile.introduce.myself.stack.vo.StackVo;
import profile.introduce.myself.user.vo.ProfileVo;

import java.util.List;

public interface UserService {
    ProfileVo getProfile(String alias);
    List<StackVo> getStackList(String alias);
}
