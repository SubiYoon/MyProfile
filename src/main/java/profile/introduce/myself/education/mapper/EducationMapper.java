package profile.introduce.myself.education.mapper;

import org.apache.ibatis.annotations.Mapper;
import profile.introduce.myself.education.vo.EducationVo;

@Mapper
public interface EducationMapper {
    EducationVo getEducationList(String alias);
}
