package profile.introduce.myself.stack.mapper;

import org.apache.ibatis.annotations.Mapper;
import profile.introduce.myself.stack.vo.StackVo;

import java.util.List;

@Mapper
public interface StackMapper {
    List<StackVo> getProjectStackList(int[] stackSeqs);
}
