package profile.introduce.myself.user.vo;

import lombok.Data;

@Data
public class ProfileVo {
    private String name;
    private String password;
    private String birthYear;
    private String sex;
    private String addr;
    private String addrDetail;
    private String simpleIntroduceMyself;
    private String detailIntroduceMyself;
    private String image;
    private String registTs;
    private String updateTs;

}
