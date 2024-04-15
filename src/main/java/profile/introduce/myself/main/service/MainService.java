package profile.introduce.myself.main.service;

import profile.introduce.myself.main.vo.MenuVo;
import profile.introduce.myself.main.vo.SampleVo;

import java.util.List;

public interface MainService {
    SampleVo selectMyInfo() throws Exception;

    List<MenuVo> selectMenu() throws Exception;
}
