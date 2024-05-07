package profile.introduce.myself.project.vo;

import lombok.Data;

@Data
public class ProjectDetailVo {
    private int project_detail_seq;
    private String alias;
    private int project_seq;
    private String detail_act_title;
    private String detail_act_cont;
    private String regist_ts;
    private String update_ts;
}
