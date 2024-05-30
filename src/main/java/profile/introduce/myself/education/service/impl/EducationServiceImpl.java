package profile.introduce.myself.education.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import profile.introduce.myself.education.mapper.EducationMapper;
import profile.introduce.myself.education.service.EducationService;
import profile.introduce.myself.education.vo.EducationVo;

@Service
public class EducationServiceImpl implements EducationService {

    @Autowired
    EducationMapper educationMapper;

    @Override
    public EducationVo getEducationList(String alias) {
        return educationMapper.getEducationList(alias);
    }
}
