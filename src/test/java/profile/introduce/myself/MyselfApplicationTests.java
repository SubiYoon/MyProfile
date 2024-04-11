package profile.introduce.myself;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import profile.introduce.myself.base.UserVo;
import profile.introduce.myself.main.vo.SampleVo;
import profile.introduce.myself.main.service.MainService;
import profile.introduce.myself.user.mapper.UserMapper;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@SpringBootTest
class MyselfApplicationTests {

    @Autowired
    MainService mainService;

    @Autowired
    UserMapper userMapper;

    @Test
    void contextLoads() throws Exception {
        SampleVo sampleVo = mainService.selectMyInfo();
        System.out.println(sampleVo.toString());
    }

    @Test
    void insertMyInfo() throws Exception{
        UserVo userVo = new UserVo(
                "윤동섭"
                , encode("1234")
                , 1992
                , "남자"
                , "청주시"
                , "청주시"
                , "간단소개"
                , "상세소개"
                , "사진(추후추가)"
                , "권한(추후추가)"
        );

        userMapper.setMybasicProfile(userVo);
    }

    public String encode(String pwd){
        MessageDigest md;

        String SALT = "PROFILE";
        int ITERATION = 1000;

        StringBuffer hexString = new StringBuffer();
        try {
            md = MessageDigest.getInstance("SHA-256");
            md.reset();
            md.update(SALT.getBytes());

            byte[] mb = md.digest(pwd.toString().getBytes("UTF-8"));

            for (int i = 0; i < ITERATION; i++) {
                md.reset();
                mb = md.digest(mb);
            }

            for (int i = 0; i < mb.length; i++) {
                hexString.append(Integer.toHexString(0xFF & mb[i]));
            }

        } catch (NoSuchAlgorithmException e) {
            System.out.println(e);
        } catch (UnsupportedEncodingException e) {
            System.out.println(e);
        }

        return hexString.toString();
    }

}
