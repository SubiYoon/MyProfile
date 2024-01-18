package profile.introduce.myself.utility;

import java.lang.ref.ReferenceQueue;
import java.lang.ref.SoftReference;
import java.util.HashMap;
import java.util.Objects;

public class CacheUtil<K, V> {

    private final HashMap<K, CacheSoftReference<K, V>> map = new HashMap<>();

    // 참조 대상 객체들의 생명 주기를 추척하고 gc 에 의해 수집되는 객체들을 모으는 데 사용
    // 참조가 약한 객체들은 여기에 담긴다.
    private final ReferenceQueue<V> queue = new ReferenceQueue<>();

    public void put(K key, V value) {
        cleanUp(); // 참조가 약한 객체들을 먼저 제거하고 넣는다.
        CacheSoftReference<K, V> ref = new CacheSoftReference<>(key, value, queue);
        map.put(key, ref);
    }

    public V get(K key) {
        CacheSoftReference<K, V> ref = map.get(key);
        if (ref == null) { // cache miss
            return null;
        }
        return ref.get(); // cache hit
    }

    public V remove(K key) {
        cleanUp();
        CacheSoftReference<K, V> ref = map.remove(key);
        if (ref == null) {
            return null;
        }
        return ref.get();
    }

    private void cleanUp() {
        CacheSoftReference<K, V> ref;
        // queue 에는 참조가 약한 객체들이 담겨있고 OOM 을 방지하기 위해 제거한다.
        // 참조 카운트가 0이 된 객체들을 jvm 이 queue 에 담는다
        while ((ref = (CacheSoftReference<K, V>) queue.poll()) != null) {
            map.remove(ref.key);
        }
    }

    private static class CacheSoftReference<K, V> extends SoftReference<V> {

        private final K key;

        public CacheSoftReference(K key, V referent, ReferenceQueue<V> queue) {
            super(referent, queue);
            this.key = key;
        }

        @Override
        public boolean equals(Object obj) {
            if (obj == this) {
                return true;
            }
            if (!(obj instanceof CacheSoftReference)) {
                return false;
            }
            CacheSoftReference<?, ?> ref = (CacheSoftReference<?, ?>) obj;
            return Objects.equals(this.key, ref.key);
        }

        @Override
        public int hashCode() {
            return Objects.hashCode(key);
        }
    }
}
