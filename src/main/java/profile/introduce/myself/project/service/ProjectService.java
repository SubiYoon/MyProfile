package profile.introduce.myself.project.service;

import profile.introduce.myself.project.vo.ProjectDetailVo;

import java.util.List;

public interface ProjectService {
    List<ProjectDetailVo> getProjectDetails(String alias, int projectSeq);
}
