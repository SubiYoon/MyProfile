package profile.introduce.myself.user.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import profile.introduce.myself.user.mapper.UserMapper;
import profile.introduce.myself.user.service.UserService;
import profile.introduce.myself.user.vo.ProfileVo;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    @Override
    public ProfileVo chooseProfile(String name) {
        return null;
//        return userMapper.chhoseProfile(name);
    }
}
