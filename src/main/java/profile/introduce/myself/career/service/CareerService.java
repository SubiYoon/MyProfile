package profile.introduce.myself.career.service;

import profile.introduce.myself.career.vo.CareerVo;

import java.util.List;

public interface CareerService {
    List<CareerVo> getCareerList(String alias);
}
