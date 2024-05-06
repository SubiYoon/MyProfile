package profile.introduce.myself.project.vo;

import lombok.Data;

@Data
public class ProjectDetailVo {
    private String project_detail_seq;
    private String alias;
    private String project_seq;
    private String detail_act_title;
    private String detail_act_cont;
    private String detail_act_term;
    private String regist_ts;
    private String update_ts;
}
