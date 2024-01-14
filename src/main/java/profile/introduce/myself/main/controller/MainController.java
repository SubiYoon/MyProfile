package profile.introduce.myself.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import profile.introduce.myself.main.service.MainService;
import profile.introduce.myself.main.vo.SampleVo;

@RestController
public class MainController {

    @Autowired
    MainService mainService;

    @RequestMapping("main")
    public void test() throws Exception {
        SampleVo sampleVo = mainService.selectMyInfo();
        System.out.println(sampleVo.toString());
    }
}
