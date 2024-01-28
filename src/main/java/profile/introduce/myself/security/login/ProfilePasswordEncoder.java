package profile.introduce.myself.security.login;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class ProfilePasswordEncoder implements PasswordEncoder {
    private static final Logger LOGGER = LoggerFactory.getLogger(ProfilePasswordEncoder.class);
    private static final String SALT = "PROFILE";
    private static final int ITERATION = 1000;

    @Override
    public String encode(CharSequence rawPassword) {
        MessageDigest md;

        StringBuffer hexString = new StringBuffer();
        try {
            md = MessageDigest.getInstance("SHA-256");
            md.reset();
            md.update(SALT.getBytes());

            byte[] mb = md.digest(rawPassword.toString().getBytes("UTF-8"));

            for (int i = 0; i < ITERATION; i++) {
                md.reset();
                mb = md.digest(mb);
            }

            for (int i = 0; i < mb.length; i++) {
                hexString.append(Integer.toHexString(0xFF & mb[i]));
            }

        } catch (NoSuchAlgorithmException e) {
            LOGGER.info("", e);
        } catch (UnsupportedEncodingException e) {
            LOGGER.info("", e);
        }

        return hexString.toString();
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        return encodedPassword.equals(encode(rawPassword));
    }
}
