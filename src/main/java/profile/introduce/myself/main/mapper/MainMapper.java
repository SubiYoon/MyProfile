package profile.introduce.myself.main.mapper;

import org.apache.ibatis.annotations.Mapper;
import profile.introduce.myself.main.vo.MenuVo;
import profile.introduce.myself.main.vo.ProfileVo;
import profile.introduce.myself.main.vo.SampleVo;

import java.util.List;

@Mapper
public interface MainMapper {
    SampleVo selectMyInfo();

    List<MenuVo> selectMenu();

    List<ProfileVo> selectProfile();
}
