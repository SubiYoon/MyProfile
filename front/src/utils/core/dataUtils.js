import { _ } from 'lodash'

/**
 * source를 target에 바인딩 시킨다.
 * 단, reactive()로 생성한 것만 가능
 * @param source 바인딩할 데이터
 * @param target 바인당할 객체
 */
export function setModel(target, source) {
    if (_.isEmpty(source)) {
        console.log('No search Data')
    } else {
        let keyArr = Object.keys(source)
        for (let key of keyArr) {
            target[`${key}`] = source[`${key}`]
        }
    }
}
