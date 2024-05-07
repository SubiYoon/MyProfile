package profile.introduce.myself.project.service;

import org.springframework.stereotype.Service;
import profile.introduce.myself.project.vo.ProjectDetailVo;

import java.util.List;

@Service
public interface ProjectService {
    List<ProjectDetailVo> getProjectDetails(String alias, int projectSeq);
}
