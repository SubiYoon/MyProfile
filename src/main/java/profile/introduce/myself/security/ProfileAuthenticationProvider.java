package profile.introduce.myself.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProfileAuthenticationProvider implements AuthenticationProvider {
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String loginId = authentication.getName();
        String loginPwd = (String)authentication.getCredentials();

        UserVo userVo = (UserVo) userDetailsService.loadUserByUsername(loginId);

        if(!passwordEncoder.matches(loginPwd, userVo.getPassword())){
            throw new BadCredentialsException("password is not matched");
        }

        return new ProfileAuthenticationToken(userVo, loginPwd, userVo.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(ProfileAuthenticationToken.class);
    }
}
