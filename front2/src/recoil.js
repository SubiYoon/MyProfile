import { atom, useRecoilState } from 'recoil';

// currentPage 상태를 위한 atom 정의
export const currentPageState = atom({
    key: 'currentPageState', // 상태를 식별하는 고유 키
    default: 1, // 초기값 설정
});

// 현재 페이지 상태를 관리하는 커스텀 훅
export const useCurrentPage = () => {
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
    return { currentPage, setCurrentPage };
};
