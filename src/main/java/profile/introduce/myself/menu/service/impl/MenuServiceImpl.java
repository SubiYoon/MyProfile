package profile.introduce.myself.menu.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import profile.introduce.myself.menu.mapper.MenuMapper;
import profile.introduce.myself.menu.service.MenuService;
import profile.introduce.myself.menu.vo.MenuVo;

import java.util.List;

@Service
public class MenuServiceImpl implements MenuService {

    @Autowired
    MenuMapper menuMapper;

    @Override
    public List<MenuVo> selectMenu(String menuGb) {
        if("admin".equals(menuGb)){
            return menuMapper.selectAdminMenu();
        } else {
            return menuMapper.selectPublicMenu();
        }
    }
}