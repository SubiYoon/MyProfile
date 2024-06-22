package profile.introduce.myself.user.mapper;

import org.apache.ibatis.annotations.Mapper;
import profile.introduce.myself.security.UserVo;
import profile.introduce.myself.stack.vo.StackVo;
import profile.introduce.myself.user.vo.ProfileVo;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserMapper {
    ProfileVo getProfile(String alias);

    List<StackVo> getStackList(String alias);

    UserVo getUser(String alias);

    Integer editProfileImage(String alias, String imageName);

    Integer updateProfile(Map<String, Object> params);
}
