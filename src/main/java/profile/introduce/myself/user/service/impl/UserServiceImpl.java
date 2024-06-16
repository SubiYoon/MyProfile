package profile.introduce.myself.user.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import profile.introduce.myself.stack.vo.StackVo;
import profile.introduce.myself.user.mapper.UserMapper;
import profile.introduce.myself.user.service.UserService;
import profile.introduce.myself.user.vo.ProfileVo;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    @Override
    public ProfileVo getProfile(String alias) {
        ProfileVo profileVo = userMapper.getProfile(alias);
        profileVo.setPassword(null);
        return profileVo;
    }

    @Override
    public List<StackVo> getStackList(String alias) {
        return userMapper.getStackList(alias);
    }
}
