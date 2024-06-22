package profile.introduce.myself.base;

import java.util.*;

public class ParamMap implements Map {

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

    public Object get(String key) {
        return useParams.get(key);
    }

    public Object getOriginal(String key) {
        return original.get(key);
    }

    public void put(String key, Object value) {
        useParams.put(key, value);
    }

    protected Map<String, Object> getUseParams() {
        return useParams;
    }

    protected Map<String, Object> getParams() {
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
        return 0;
    }

    @Override
    public boolean isEmpty() {
        return false;
    }

    @Override
    public boolean containsKey(Object key) {
        return false;
    }

    @Override
    public boolean containsValue(Object value) {
        return false;
    }

    @Override
    public Object get(Object key) {
        return null;
    }

    @Override
    public Object put(Object key, Object value) {
        return null;
    }

    @Override
    public Object remove(Object key) {
        return null;
    }

    @Override
    public void putAll(Map m) {

    }

    @Override
    public void clear() {

    }

    @Override
    public Set keySet() {
        return Set.of();
    }

    @Override
    public Collection values() {
        return List.of();
    }

    @Override
    public Set<Entry> entrySet() {
        return Set.of();
    }
}
