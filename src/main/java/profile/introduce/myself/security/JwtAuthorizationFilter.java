package profile.introduce.myself.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;
import profile.introduce.myself.utility.ItemCheck;
import profile.introduce.myself.utility.JwtUtil;

import java.io.IOException;
import java.security.SignatureException;
import java.util.HashMap;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    @Autowired
    UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {

        // 토큰이 필요없는 경우 pass
        if (request.getMethod().equals("GET")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 요청 Method가 Options의 경우 pass
        if (request.getMethod().equalsIgnoreCase("OPTIONS")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Client에서 API를 요청시 쿠키를 확인
        Cookie[] cookies = request.getCookies();
        String token = null;
        if (ItemCheck.isNotEmpty(cookies)) {
            for (Cookie cookie : cookies) {
                if ("PROFILE-JWT".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        try {
            if (ItemCheck.isNotEmpty(token)) {
                if (JwtUtil.isValidToken(token)) {
                    String loginId = JwtUtil.getUserIdFromToken(token);
                    log.debug("loginId Check :: " + loginId);

                    if (ItemCheck.isNotEmpty(loginId)) {
                        UserDetails userDetails = userDetailsService.loadUserByUsername(loginId);
                        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                        filterChain.doFilter(request, response);
                    } else throw new ProfileException(ErrorCode.USER_NOT_FOUND);
                } else throw new ProfileException(ErrorCode.TOKEN_NOT_VALID);
            }else throw new ProfileException(ErrorCode.TOKEN_NOT_FOUND);
        } catch (Exception e) {

            // Client에게 인증 실패시 보낼 Message
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");

            ObjectMapper objectMapper = new ObjectMapper();

            objectMapper.writeValue(response.getWriter(), tokenErrorTrace(e));

        }
    }

    private HashMap<String, Object> tokenErrorTrace(Exception e){
        String resultMessage;
        if (e instanceof ExpiredJwtException){
            resultMessage = "TOKEN Expired";
        } else if (e instanceof SignatureException){
            resultMessage = "TOKEN SignatureException Login";
        } else if (e instanceof JwtException){
            resultMessage = "TOKEN Parsing JwtException";
        } else {
            resultMessage = "로그인 정보가 없습니다. 로그인해 주세요.\n\r같은 에러가 반복되면 관리자에게 문의하세요.";
        }

        HashMap<String, Object> jsonMap = new HashMap<>();
        jsonMap.put("status", 401);
        jsonMap.put("code", "9999");
        jsonMap.put("message", resultMessage);
        jsonMap.put("reason", e.getMessage());
        log.debug(resultMessage, e);
        return jsonMap;
    }
}
