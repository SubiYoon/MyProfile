package profile.introduce.myself.menu.mapper;

import org.apache.ibatis.annotations.Mapper;
import profile.introduce.myself.menu.vo.MenuVo;

import java.util.List;

@Mapper
public interface MenuMapper {
    List<MenuVo> selectAdminMenu();
    List<MenuVo> selectPublicMenu();
}
