package profile.introduce.myself.base;

import lombok.NonNull;

import java.util.*;

public class ParamMap implements Map<String, Object> {

    Map<String, Object> useParams = new LinkedHashMap<>();

    private Map<String, Object> original;

    private ParamMap() {
        // 원본 데이터 유지를 위한 직접 생성하는 것 방지
    }

    public static ParamMap init(){
        return new ParamMap();
    }

    public static ParamMap init(JsonParams json){
        ParamMap paramMap = new ParamMap();

        Iterator<?> iterator = json.getParams().keySet().iterator();
        while (iterator.hasNext()){
            String key = (String) iterator.next();
            paramMap.put(key, json.getParams().get(key));
            paramMap.setParams(paramMap.getUseParams());
        }

        return paramMap;
    }

    /**
     * key값을 이용하여 데이터를 가져옴
     * @param key 데이터의 key값
     * @return Object
     */
    @Override
    public Object get(Object key) {
        return useParams.get(key);
    }

    /**
     * key값을 이용하여 원본데이터를 가져옴
     * @param key 데이터의 key값
     * @return Object
     */
    public Object getOriginal(String key) {
        return original.get(key);
    }

    /**
     * key값을 이용하여 새로운 데이터를 추가 or 수정함
     * @param key 데이터의 key값.
     * @return Map
     */
    @Override
    public Object put(String key, Object value) {
        useParams.put(key, value);
        return useParams;
    }

    protected Map<String, Object> getUseParams() {
        return useParams;
    }

    protected Map<String, Object> getOriginalParams() {
        return original;
    }

    protected void setParams(Map<String, Object> params) {
        this.original = params;
    }

    public Map<String, Object> executeParams(){
        return useParams;
    }

    @Override
    public int size() {
        return useParams.size();
    }

    @Override
    public boolean isEmpty() {
        return useParams.isEmpty();
    }

    @Override
    public boolean containsKey(Object key) {
        return useParams.containsKey(key);
    }

    @Override
    public boolean containsValue(Object value) {
        return useParams.containsValue(value);
    }

    @Override
    public Object remove(Object key) {
        useParams.put((String)key, null);
        return null;
    }

    @Override
    public void putAll(Map<? extends String, ?> m) {
        useParams.putAll(m);
    }

    @Override
    public void clear() {
        useParams.clear();
    }

    @Override
    public Set keySet() {
        return Set.of(useParams);
    }

    @Override
    public Collection values() {
        return List.of(useParams);
    }

    @Override
    public Set<Entry<String, Object>> entrySet() {
        return Set.of((Entry<String, Object>) useParams);
    }
}
