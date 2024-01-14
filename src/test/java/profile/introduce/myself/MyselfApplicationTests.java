package profile.introduce.myself;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import profile.introduce.myself.main.vo.SampleVo;
import profile.introduce.myself.main.service.MainService;

@SpringBootTest
class MyselfApplicationTests {

    @Autowired
    MainService mainService;

    @Test
    void contextLoads() throws Exception {
        SampleVo sampleVo = mainService.selectMyInfo();
        System.out.println(sampleVo.toString());
    }

}
