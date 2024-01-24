package profile.introduce.myself.main.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import profile.introduce.myself.main.service.MainService;
import profile.introduce.myself.main.vo.SampleVo;

@RestController
public class MainController {

    private final Logger logger = LoggerFactory.getLogger(MainController.class);

    @Autowired
    MainService mainService;

    @RequestMapping("main")
    public void mainTest() throws Exception {
        logger.debug("Vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");

        SampleVo sampleVo = mainService.selectMyInfo();
        System.out.println(sampleVo.toString());
    }
}
