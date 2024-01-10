package profile.introduce.myself.main.mapper;

import org.apache.ibatis.annotations.Mapper;
import profile.introduce.myself.vo.SampleVo;

@Mapper
public interface MainMapper {
    SampleVo selectMyInfo();
}
