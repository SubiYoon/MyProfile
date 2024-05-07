package profile.introduce.myself.project.service;

import org.springframework.stereotype.Service;
import profile.introduce.myself.project.vo.ProjectDetailVo;

@Service
public interface ProjectService {
    ProjectDetailVo getProjectDetail(String alias, int projectDetailSeq);
}
