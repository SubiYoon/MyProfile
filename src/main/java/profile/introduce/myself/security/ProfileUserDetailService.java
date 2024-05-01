package profile.introduce.myself.security;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import profile.introduce.myself.user.mapper.UserMapper;

@Service
@RequiredArgsConstructor
public class ProfileUserDetailService implements UserDetailsService {

    @Autowired
    private UserMapper userMapper;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserVo userVo = userMapper.getUser(username);
        if(userVo == null){
            throw new UsernameNotFoundException("user not found");
        }

        return userVo;
    }
}
