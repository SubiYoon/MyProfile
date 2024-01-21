package profile.introduce.myself.user.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import profile.introduce.myself.base.Results;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("user")
public class UserController {

    @RequestMapping("login")
    public ConcurrentHashMap<Results.Type, Object> login(HttpServletRequest request, HttpServletResponse response, @RequestBody Map<String, Object> loginMap){
        ConcurrentHashMap resultMap = new ConcurrentHashMap();

        return  resultMap;
    }
}
