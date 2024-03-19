package profile.introduce.myself.utility;

import java.lang.reflect.Array;
import java.util.List;
import java.util.Map;

public class ItemCheck {
    /**
     * 해당 변수가 비어있는지를 확인하기 위한 함수
     *
     * @param obj
     * @return boolean
     */
    public static Boolean isEmpty(Object obj) {
        if (obj instanceof String) return obj == null || "".equals(obj.toString().trim());
        else if (obj instanceof List) return obj == null || ((List) obj).isEmpty();
        else if (obj instanceof Map) return obj == null || ((Map) obj).isEmpty();
        else if (obj instanceof Object[]) return obj == null || Array.getLength(obj) == 0;
        else return obj == null;
    }

    /**
     * 해당 변수가 비어있지 않은지를 확인하기 위한 함수
     *
     * @param obj
     * @return boolean
     */
    public static Boolean isNotEmpty(Object obj) {
        return !isEmpty(obj);
    }
}