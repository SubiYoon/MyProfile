package profile.introduce.myself.project.vo;

import lombok.Data;

@Data
public class ProjectDetailVo {
    private int projectDetailSeq;
    private String alias;
    private int projectSeq;
    private String detailActTitle;
    private String detailActCont;
    private String image;
    private String registTs;
    private String updateTs;
}
