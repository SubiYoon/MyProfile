import { atom, useRecoilState } from 'recoil';

// currentPage 상태를 위한 atom 정의
export const currentPageState = atom({
    key: 'currentPageState', //페이지 상태 업데이트
    default: 1, // 초기값
});

export const userState = atom({
    key: 'userState', //user 정보 업데이트
    default: null,
});

export const profileState = atom({
    key: 'profileState', //프로필 정보 업데이트
    default: {},
});

export const stackState = atom({
    key: 'stackState', //스택 정보 업데이트
    default: [],
});

export const careerState = atom({
    key: 'careerState', //커리어 정보 업데이트
    default: null,
});

export const educationState = atom({
    key: 'educationState', //교육이력 정보 업데이트
    default: null,
});
