package profile.introduce.myself.user.mapper;

import org.apache.ibatis.annotations.Mapper;
import profile.introduce.myself.security.UserVo;
import profile.introduce.myself.user.vo.MyStackVo;
import profile.introduce.myself.user.vo.ProfileVo;

@Mapper
public interface UserMapper {
    ProfileVo chooseProfile(String alias);

    List<MyStackVo> getStackList(String name);

    UserVo getUser(String username);
}
