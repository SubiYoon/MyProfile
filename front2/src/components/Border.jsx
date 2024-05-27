import React, { useEffect, useState, useRef } from 'react';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { currentPageState } from '@/recoil.js';
import { motion, AnimatePresence } from 'framer-motion';
import Home from '@/pages/Home.jsx';
import Profile from '@/pages/Profile.jsx';
import Skills from '@/pages/Skills.jsx';
import Project from '@/pages/Project.jsx';

const Border = React.forwardRef(({ children, urlGb }, ref) => {
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
    const [backgroundColor, setBackgroundColor] = useState(null);
    const [previousBackgroundColor, setPreviousBackgroundColor] =
        useState(null);
    const [isAnimating, setIsAnimating] = useState(true);
    const prevPageRef = useRef(currentPage);
    const containerRef = useRef(null);

    const pageContents = {
        1: <Home urlGb={urlGb} />,
        2: <Profile />,
        3: <Skills />,
        4: <Project userGb={urlGb} />,
    };

    useEffect(() => {
        const colorMap = {
            1: 'black',
            2: 'white',
            3: 'gray',
            4: 'test',
        };

        setPreviousBackgroundColor(backgroundColor);
        setBackgroundColor(colorMap[currentPage]);

        prevPageRef.current = currentPage;
    }, [currentPage]);

    const fromY = currentPage > prevPageRef.current ? 1400 : -1400;
    const toY = currentPage > prevPageRef.current ? -1400 : 1400;

    const handleWheel = (event) => {
        const container = containerRef.current;
        if (container) {
            const { clientHeight, scrollHeight, scrollTop } = container;
            const isScrollable = scrollHeight > clientHeight;

            const isTop = scrollTop === 0 && event.deltaY < 0;
            const isBottom =
                scrollTop + clientHeight >= scrollHeight && event.deltaY > 0;

            if (!isScrollable || isTop || isBottom) {
                prevPageRef.current = currentPage;
                const newPage = currentPage + (event.deltaY > 0 ? 1 : -1);
                if (newPage >= 1 && newPage <= 4) {
                    setCurrentPage(newPage);
                }
            }
        }
    };

    const handleAnimationComplete = () => {
        setIsAnimating(false);
    };

    return (
        <Wrapper key={currentPage} onWheel={handleWheel}>
            <Background
                $color={previousBackgroundColor}
                exit={{ y: toY }}
                transition={{ duration: 0.6 }}
            />
            <Background
                $color={backgroundColor}
                initial={{ y: fromY }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                onAnimationComplete={handleAnimationComplete}
            />
            <AnimatePresence initial={false} custom={null} mode="wait">
                {!isAnimating && (
                    <Container ref={containerRef} className="contentContainer">
                        {pageContents[currentPage]}
                    </Container>
                )}
            </AnimatePresence>
        </Wrapper>
    );
});

export default Border;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: white;
    position: relative;
    overflow: hidden;
`;

const Background = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme, $color }) => theme.backgroundColors[$color]};
    z-index: -1;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    position: absolute;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;
