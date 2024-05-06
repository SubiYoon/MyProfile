package profile.introduce.myself.career.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import profile.introduce.myself.career.mapper.CareerMapper;
import profile.introduce.myself.career.service.CareerService;
import profile.introduce.myself.career.vo.CareerVo;
import profile.introduce.myself.project.vo.ProjectVo;
import profile.introduce.myself.stack.mapper.StackMapper;
import profile.introduce.myself.stack.vo.StackVo;

import java.util.List;
import java.util.stream.Stream;

@Slf4j
@Service
public class CareerServiceImpl implements CareerService {

    @Autowired
    CareerMapper careerMapper;

    @Autowired
    StackMapper stackMapper;

    @Override
    public List<CareerVo> getCareerList(String alias) {
        log.debug("Career 정보 확인 :: " + alias + "정보 조회");

        List<CareerVo> careerList = careerMapper.getCareerList(alias);

        for(CareerVo data : careerList){
            for(ProjectVo projectVo : data.getProjectList()){
                int[] stackSeqs = Stream.of(projectVo.getProjectStackSeqs().split("[|][|]")).mapToInt(Integer::parseInt).toArray();
                List<StackVo> stackList = stackMapper.getProjectStackList(stackSeqs);
                projectVo.setStackList(stackList);
            }
        }

        return careerList;
    }
}
