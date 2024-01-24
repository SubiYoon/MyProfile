package profile.introduce.myself.user.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import profile.introduce.myself.base.UserVo;
import profile.introduce.myself.user.mapper.UserMapper;
import profile.introduce.myself.user.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    @Override
    public void setMybasicProfile(UserVo userVo) throws Exception {
        userMapper.setMybasicProfile(userVo);
    }
}
