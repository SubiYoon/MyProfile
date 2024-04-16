package profile.introduce.myself.base;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.RegExUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.util.regex.Pattern;

@Controller
public class ApiController {

    private static final Pattern apiPattern = Pattern.compile("/api/");
    @RequestMapping(value = "/api/**")
    public void forwardApi(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String requestURI = request.getRequestURI();
        request.getRequestDispatcher(RegExUtils.replaceFirst(requestURI, apiPattern, "/"))
                .forward(request, response);
    }
}
