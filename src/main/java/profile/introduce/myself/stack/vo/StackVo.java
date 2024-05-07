package profile.introduce.myself.stack.vo;

import lombok.Data;

@Data
public class StackVo {
    private int stackSeq;
    private String name;
    private String stackName;
    private String stackLevel;
    private String stackDetail;
    private String stackImage;
    private String category;
    private String categoryLevel;
    private String profileViewYn;
    private String registTs;
    private String updateTs;
}