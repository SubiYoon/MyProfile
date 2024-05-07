package profile.introduce.myself.project.mapper;

import org.apache.ibatis.annotations.Mapper;
import profile.introduce.myself.project.vo.ProjectDetailSemiVo;
import profile.introduce.myself.project.vo.ProjectDetailVo;

import java.util.List;

@Mapper
public interface ProjectMapper {
    ProjectDetailVo getProjectDetail(String alias, int projectDetailSeq);

    List<ProjectDetailSemiVo> getProjectDetailSemiList(String alias, int projectSeq);
}
