package profile.introduce.myself.user.mapper;

import org.apache.ibatis.annotations.Mapper;
import profile.introduce.myself.user.vo.MyStackVo;
import profile.introduce.myself.user.vo.ProfileVo;

import java.util.List;

@Mapper
public interface UserMapper {
    ProfileVo chooseProfile(String name);

    List<MyStackVo> getStackList(String name);
}
