package profile.introduce.myself.career.mapper;

import org.apache.ibatis.annotations.Mapper;
import profile.introduce.myself.career.vo.CareerVo;

import java.util.List;

@Mapper
public interface CareerMapper {
    List<CareerVo> getCareerList(String alias);
}
