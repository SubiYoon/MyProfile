package profile.introduce.myself.base;

import java.io.Serializable;
import java.util.Map;

public class JsonParams implements Serializable {

    private Map<String, Object> params;

    private JsonParams() {
        // 원본 데이터 유지를 위한 직접 생성하는 것 방지
    }

    protected Map<String, Object> getParams() {
        return params;
    }

    protected void setParams(Map<String, Object> params) {
        this.params = params;
    }
}
