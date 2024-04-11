import axios from 'axios';

const axiosInstance = axios.create({
  timeout: 5000, // 요청 제한 시간 (밀리초)
  headers: {
    'Content-Type': 'application/json', // 요청 헤더 설정
    // Authorization: , // 인증 토큰 아직 미정
  },
});

export default axiosInstance;
