package profile.introduce.myself.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONObject;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

@Component
public class ProfileLogoutSuccessHandler implements LogoutSuccessHandler {
    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        try (PrintWriter writer = response.getWriter()){
            HashMap<String, String> result = new HashMap<>();

            result.put("result", "success");

            response.setStatus(HttpServletResponse.SC_OK);
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");

            JSONObject jsonObject = new JSONObject(result);

            writer.print(jsonObject);
            writer.flush();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
