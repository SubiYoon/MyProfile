package profile.introduce.myself.menu.service;

import profile.introduce.myself.menu.vo.MenuVo;

import java.util.List;

public interface MenuService {
    List<MenuVo> selectMenu(String menuGb) throws Exception;
}
