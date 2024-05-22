package profile.introduce.myself.menu.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/menu/{menuGb}")
    public Map<String, Object> menu(HttpServletRequest request, @PathVariable String menuGb) throws Exception {

        Map<String, Object> result = new HashMap<>();

        if(request.getMethod().equals("GET")){
            log.debug("초기 메뉴 조회");
            List<MenuVo> menus = menuService.selectMenu(menuGb);

            result.put("menus", menus);
        }
        return result;
    }
}
