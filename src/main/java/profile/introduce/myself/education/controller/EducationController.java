package profile.introduce.myself.education.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import profile.introduce.myself.education.service.EducationService;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/education/{alias}")
public class EducationController {

    @Autowired
    EducationService educationService;

    @RequestMapping("")
    public Map<String, Object> getEducationList(@PathVariable String alias, HttpServletRequest req) {

        Map<String, Object> result = new HashMap<>();

        if ("GET".equals(req.getMethod())){
            result.put("educations", educationService.getEducationList(alias));

        } else {
            result.put("error", "요청 방식을 확인하세요.");
        }

        return result;
    }
}
