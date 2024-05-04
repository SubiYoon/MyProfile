package profile.introduce.myself.career.vo;

import lombok.Data;
import profile.introduce.myself.project.vo.ProjectVo;

import java.util.List;

@Data
public class CareerVo {
    private String careerSeq;
    private String alias;
    private String company;
    private String companyUrl;
    private String companyLogo;
    private String in;
    private String inLevel;
    private String out;
    private String outLevel;
    private String registTs;
    private String updateTs;

    private List<ProjectVo> projectList;
}
