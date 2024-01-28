package profile.introduce.myself.security.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import profile.introduce.myself.base.UserVo;
import profile.introduce.myself.user.mapper.UserMapper;

import java.util.List;

@Service
public class ProfileUserDetailService implements UserDetailsService {

    @Autowired
    UserMapper userMapper;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<UserVo> list =  userMapper.findUserList(username);
        UserVo user = null;
        if(list.isEmpty()){
            throw new UsernameNotFoundException("해당 유저가 존재하지 않음");
        } else {
            user = list.iterator().next();
        }
        return user;
    }
}
