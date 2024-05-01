package profile.introduce.myself.menu.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import profile.introduce.myself.menu.service.MenuService;
import profile.introduce.myself.menu.vo.MenuVo;

import java.util.List;

@Slf4j
@RestController
public class MenuController {

    @Autowired
    MenuService menuService;

    @GetMapping("/menu")
    public List<MenuVo> menu() throws Exception {
        return menuService.selectMenu();
    }
}
