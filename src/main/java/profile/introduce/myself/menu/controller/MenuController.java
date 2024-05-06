package profile.introduce.myself.menu.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import profile.introduce.myself.menu.service.MenuService;
import profile.introduce.myself.menu.vo.MenuVo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
public class MenuController {

    @Autowired
    MenuService menuService;

    @GetMapping("/menu")
    public Map<String, Object> menu(HttpServletRequest request) throws Exception {

        Map<String, Object> result = new HashMap<>();

        if(request.getMethod().equals("GET")){
            List<MenuVo> menus = menuService.selectMenu();

            result.put("menus", menus);
        }
        return result;
    }
}
