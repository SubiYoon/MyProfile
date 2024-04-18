package profile.introduce.myself.user.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import profile.introduce.myself.user.mapper.UserMapper;
import profile.introduce.myself.user.service.UserService;
import profile.introduce.myself.user.vo.MyStackVo;
import profile.introduce.myself.user.vo.ProfileVo;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    @Override
    public ProfileVo chooseProfile(String name) {
        return userMapper.chooseProfile(name);
    }

    @Override
    public List<MyStackVo> getStackList(String name) {
        return userMapper.getStackList(name);
    }
}
