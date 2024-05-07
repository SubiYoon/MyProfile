package profile.introduce.myself.project.vo;

import lombok.Data;
import profile.introduce.myself.stack.vo.StackVo;

import java.util.List;

@Data
public class ProjectVo {
    private int projectSeq;
    private String alias;
    private int careerSeq;
    private String projectName;
    private String projectTerm;
    private String projectContributeRate;
    private String projectNumberOfParticipants;
    private String projectStackSeqs;
    private List<ProjectDetailSemiVo> projectDetailSemiList;
    private List<StackVo> stackList;
    private String registTs;
    private String updateTs;
}
