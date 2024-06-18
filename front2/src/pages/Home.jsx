import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import React from 'react';
import Header from '@/pages/Header.jsx';
import { useRecoilValue } from 'recoil';
import { currentPageState, profileState } from '@/recoil.js';

const Home = React.memo(({ urlGb }) => {
    const mainContent = useRecoilValue(profileState).mainContent;
    const currentPage = useRecoilValue(currentPageState);

    console.log('메이이이이인콘텐트', mainContent);
    return (
        <HomeWrapper $currentPage={currentPage}>
            {mainContent !== null ? (
                <Header text={mainContent} gb={'main'} />
            ) : null}
        </HomeWrapper>
    );
});

export default Home;

const HomeWrapper = styled.div`
    display: ${({ $currentPage }) => ($currentPage === 1 ? 'block' : 'none')};
    padding-left: 8%;
    padding-right: 8%;
    width: 100%;
    font-family: 'consola';
`;
