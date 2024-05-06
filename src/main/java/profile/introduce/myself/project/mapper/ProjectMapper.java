package profile.introduce.myself.project.mapper;

import org.apache.ibatis.annotations.Mapper;
import profile.introduce.myself.project.vo.ProjectDetailVo;

import java.util.List;

@Mapper
public interface ProjectMapper {
    List<ProjectDetailVo> getPrjectDetails(String alias, int projectSeq);
}
