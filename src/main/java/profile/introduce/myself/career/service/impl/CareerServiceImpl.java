package profile.introduce.myself.career.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import profile.introduce.myself.career.mapper.CareerMapper;
import profile.introduce.myself.career.service.CareerService;
import profile.introduce.myself.career.vo.CareerVo;

import java.util.List;

@Slf4j
@Service
public class CareerServiceImpl implements CareerService {

    @Autowired
    CareerMapper careerMapper;

    @Override
    public List<CareerVo> getCareerList(String alias) {
        log.debug("Career 정보 확인 :: " + alias + "정보 조회");
        return careerMapper.getCareerList(alias);
    }
}
