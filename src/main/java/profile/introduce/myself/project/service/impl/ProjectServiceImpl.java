package profile.introduce.myself.project.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import profile.introduce.myself.project.mapper.ProjectMapper;
import profile.introduce.myself.project.service.ProjectService;
import profile.introduce.myself.project.vo.ProjectDetailVo;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    ProjectMapper projectMapper;

    @Override
    public ProjectDetailVo getProjectDetail(String alias, int projectDetailSeq) {
        return projectMapper.getProjectDetail(alias, projectDetailSeq);
    }
}
