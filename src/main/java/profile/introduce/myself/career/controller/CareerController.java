package profile.introduce.myself.career.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import profile.introduce.myself.career.service.CareerService;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/career/{alias}")
public class CareerController {

    @Autowired
    CareerService careerService;

    @RequestMapping("")
    public Map<String, Object> getCareer(@PathVariable("alias") String alias, HttpServletRequest request) {
        Map<String, Object> result = new HashMap<>();

        if(request.getMethod().equals("GET")){
            log.debug("이력정보 조회 :: " + alias);
            result.put("careers", careerService.getCareerList(alias));
        }

        return result;
    }

}
