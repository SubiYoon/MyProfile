import axios from 'axios'

export const instance = axios.create({})

instance.interceptors.request.use(
    function (config) {
        // 요청이 전달되기 전에 작업 수행
        return config
    },
    function (error) {
        // 요청 오류가 있는 작업 수행
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    function (response) {
        // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
        // 응답 데이터가 있는 작업 수행
        return response
    },
    function (error) {
        // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
        // 응답 오류가 있는 작업 수행
        return Promise.reject(error)
    }
)
