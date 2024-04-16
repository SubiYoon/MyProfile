package profile.introduce.myself.user.mapper;

import org.apache.ibatis.annotations.Mapper;
import profile.introduce.myself.user.vo.ProfileVo;

@Mapper
public interface UserMapper {
    ProfileVo chooseProfile(String name);
}
