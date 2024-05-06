package profile.introduce.myself.project.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import profile.introduce.myself.project.mapper.ProjectMapper;
import profile.introduce.myself.project.service.ProjectService;
import profile.introduce.myself.project.vo.ProjectDetailVo;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    ProjectMapper projectMapper;

    @Override
    public List<ProjectDetailVo> getProjectDetails(String alias, int projectSeq) {
        return projectMapper.getPrjectDetails(alias, projectSeq);
    }
}
