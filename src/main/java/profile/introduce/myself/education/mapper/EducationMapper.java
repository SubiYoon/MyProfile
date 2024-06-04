package profile.introduce.myself.education.mapper;

import org.apache.ibatis.annotations.Mapper;
import profile.introduce.myself.education.vo.EducationVo;

import java.util.List;

@Mapper
public interface EducationMapper {
    List<EducationVo> getEducationList(String alias);
}
