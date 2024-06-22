package profile.introduce.myself.user.service.impl;

import lombok.extern.log4j.Log4j2;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import profile.introduce.myself.base.ParamMap;
import profile.introduce.myself.stack.vo.StackVo;
import profile.introduce.myself.user.mapper.UserMapper;
import profile.introduce.myself.user.service.UserService;
import profile.introduce.myself.user.vo.ProfileVo;
import profile.introduce.myself.utility.FileUtil;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
@Log4j2
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    @Override
    public ProfileVo getProfile(String alias) {
        ProfileVo profileVo = userMapper.getProfile(alias);
        profileVo.setPassword(null);
        return profileVo;
    }

    @Override
    public List<StackVo> getStackList(String alias) {
        return userMapper.getStackList(alias);
    }

    @Override
    public Integer editProfileImage(String alias, MultipartFile profileImage) {
        log.debug("사용자 [[ " + alias + " ]] 프로필 이미지 변경 시도");

        File profileImageDir = new File("src/main/resources/static/profile/" + alias);

        if(profileImageDir.exists() && profileImageDir.isDirectory()){
            try {
                FileUtils.cleanDirectory(profileImageDir);
            } catch (IOException e) {
                log.debug("profile imageFoler clean failure");
                throw new RuntimeException(e);
            }
        }

        FileUtil.saveFileChageName(profileImage, "src/main/resources/static/profile/" + alias + "/", alias, null, false);

        return userMapper.editProfileImage(alias, alias + "." + profileImage.getOriginalFilename().split("[.]")[1]);
    }

    @Override
    public Integer updateProfile(ParamMap params) {
        log.debug("사용자 [[ " + params.get("alias") + " ]] 프로필 변경 시도");

        return userMapper.updateProfile(params.executeParams());
    }
}
