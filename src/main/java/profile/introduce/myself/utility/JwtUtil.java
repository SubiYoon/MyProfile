package profile.introduce.myself.utility;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import profile.introduce.myself.security.UserVo;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
@PropertySource("classpath:application-security.properties")
public class JwtUtil {
    //JWT secretKey
    @Value("${jwtSecretKey}")
    private String SECRET_KEY;
    private static Key key;
    private static final String JWT_TYPE= "JWT";
    private static final String ALGORITHM = "HS256";
    private static final String LOGIN_ID = "loginId";
    private static final String USERNAME = "username";

    @PostConstruct
    public void init() {
        key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    }

    // JWT 토큰 생성
    public static String createJwtToken(UserVo userVo) {
        JwtBuilder builder = Jwts.builder()
                .setHeader(createHeader())                      // Header 구성
                .setClaims(createClaims(userVo))                // payload - Claims 구성
                .setSubject(java.lang.String.valueOf(userVo.getAlias()))  // payload - Subject 구성
                .setIssuer("profile")                           // Issuer 구성
                .signWith(key, SignatureAlgorithm.HS256)        // Signature 구성
                .setExpiration(createExpiredDate());            // Token 만료일 구성
        return builder.compact();
    }

    // JWT 토큰 검증
    public static boolean isValidToken(String token) {
        try {
            Claims claims = getClaimsFormToken(token);

            log.info("expireTime : " + claims.getExpiration());
            log.info("loginId : " + claims.get(LOGIN_ID));
            log.info("username : " + claims.get(USERNAME));

            return true;
        } catch (ExpiredJwtException expiredJwtException) {
            log.error("Token Expired", expiredJwtException);
            return false;
        } catch (JwtException jwtException) {
            log.error("Token Tampered", jwtException);
            return false;
        } catch (NullPointerException npe) {
            log.error("Token is null", npe);
            return false;
        }
    }

    /**
     * 토큰의 만료기간을 지정하는 함수
     * @return Date
     */
    private static Date createExpiredDate() {
        // 토큰의 만료기간은 6시간으로 지정
        Instant now = Instant.now();
        Instant expiryDate = now.plus(Duration.ofHours(6));
        return Date.from(expiryDate);
    }

    /**
     * JWT의 헤더값을 생성해주는 메서드
     */
    private static Map<String, Object> createHeader() {
        Map<String, Object> header = new HashMap<>();

        header.put("typ", JWT_TYPE);
        header.put("alg", ALGORITHM);
        header.put("regDate", System.currentTimeMillis());
        return header;
    }

    /**
     * 사용자 정보를 기반으로 클래임을 생성해주는 메서드
     * @param user 사용자 정보
     * @return Map<String, Object>
     */
    private static Map<String, Object> createClaims(UserVo user) {
        // 공개 클래임에 사용자의 이름과 이메일을 설정해서 정보를 조회할 수 있다.
        Map<String, Object> claims = new HashMap<>();

        log.info("loginId : " + user.getAlias());
        log.info("username : " + user.getUsername());

        claims.put(LOGIN_ID, user.getAlias());
        claims.put(USERNAME, user.getUsername());
        return claims;
    }

    /**
     * 토큰 정보를 기반으로 Claims 정보를 반환받는 메서드
     * @return Claims : Claims
     */
    private static Claims getClaimsFormToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key)
                .build().parseClaimsJws(token).getBody();
    }

    /**
     * 토큰을 기반으로 사용자 정보를 반환받는 메서드
     * @return String : 사용자 아이디
     */
    public static String getUserIdFromToken(String token) {
        Claims claims = getClaimsFormToken(token);
        return claims.get(LOGIN_ID).toString();
    }
}