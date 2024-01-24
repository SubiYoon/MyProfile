package profile.introduce.myself.user.mapper;

import org.apache.ibatis.annotations.Mapper;
import profile.introduce.myself.base.UserVo;

import java.util.List;

@Mapper
public interface UserMapper {
    List<UserVo> findUserList(String username);
    void setMybasicProfile(UserVo userVo);
}
