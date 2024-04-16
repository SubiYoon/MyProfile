package profile.introduce.myself.menu.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import profile.introduce.myself.menu.service.MenuService;
import profile.introduce.myself.menu.vo.MenuVo;

import java.util.List;

@RestController
public class MenuController {

    private final Logger logger = LoggerFactory.getLogger(MenuController.class);

    @Autowired
    MenuService menuService;

    @GetMapping("/menu")
    public List<MenuVo> menu() throws Exception {
        return menuService.selectMenu();
    }
}
