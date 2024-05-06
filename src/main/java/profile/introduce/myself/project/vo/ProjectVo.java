package profile.introduce.myself.project.vo;

import lombok.Data;
import profile.introduce.myself.stack.vo.StackVo;

import java.util.List;

@Data
public class ProjectVo {
    private String projectSeq;
    private String alias;
    private String careerSeq;
    private String projectName;
    private String projectTerm;
    private String projectContributeRate;
    private String projectNumberOfParticipants;
    private String projectStackSeqs;
    private List<ProjectDetailVo> projectDetailList;
    private List<StackVo> stackList;
    private String registTs;
    private String updateTs;
}
