package profile.introduce.myself.education.service;

import profile.introduce.myself.education.vo.EducationVo;

import java.util.List;

public interface EducationService {
    List<EducationVo> getEducationList(String alias);
}
