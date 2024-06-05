import React, { useEffect, useState, useRef } from 'react';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { currentPageState } from '@/recoil.js';
import { motion, AnimatePresence } from 'framer-motion';
import Home from '@/pages/Home.jsx';
import Profile from '@/pages/Profile.jsx';
import Skills from '@/pages/Skills.jsx';
import Project from '@/pages/Project.jsx';
import Dot from '@/components/layout/Dot.jsx';
import Education from '@/pages/Education.jsx';

const Border = React.forwardRef(({ urlGb }, ref) => {
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
    const [backgroundColor, setBackgroundColor] = useState(null);
    const [previousBackgroundColor, setPreviousBackgroundColor] =
        useState(null);
    const prevPageRef = useRef(currentPage);
    const outerDivRef = useRef(null);

    const pageContents = [
        { id: 1, component: Home },
        { id: 2, component: Profile },
        { id: 3, component: Skills },
        { id: 4, component: Project },
        { id: 5, component: Education },
    ];

    const sectionRefs = Array.from({ length: pageContents.length }, () =>
        useRef(null),
    );

    useEffect(() => {
        const colorMap = {
            1: 'black',
            2: 'white',
            3: 'gray',
            4: 'beige',
            5: 'realBlack',
        };

        setPreviousBackgroundColor(backgroundColor);
        setBackgroundColor(colorMap[currentPage]);

        prevPageRef.current = currentPage;
    }, [currentPage]);

    useEffect(() => {
        const scrollHandler = () => {
            if (!outerDivRef.current) return;

            const { scrollTop, clientHeight } = outerDivRef.current;

            sectionRefs.forEach((ref, index) => {
                const section = ref.current;
                const { offsetTop, offsetHeight } = section;
                if (
                    scrollTop >= offsetTop - clientHeight / 2 &&
                    scrollTop < offsetTop + offsetHeight - clientHeight / 2
                ) {
                    setCurrentPage(index + 1);
                }
            });
        };

        const outerDivRefCurrent = outerDivRef.current;
        if (!outerDivRefCurrent) return;
        outerDivRefCurrent.addEventListener('scroll', scrollHandler);
        return () => {
            outerDivRefCurrent.removeEventListener('scroll', scrollHandler);
        };
    }, [currentPage, setCurrentPage]);

    const fromY = currentPage > prevPageRef.current ? 1400 : -1400;
    const toY = currentPage > prevPageRef.current ? -1400 : 1400;

    const handleMenuClick = (page) => {
        setCurrentPage(page);
        sectionRefs[page - 1].current.scrollIntoView();
    };

    return (
        <Wrapper ref={outerDivRef}>
            <AnimatePresence initial={false} custom={null}>
                <Background
                    key={`${currentPage}_previous`}
                    $color={previousBackgroundColor}
                    exit={{ y: toY }}
                    transition={{ duration: 0.6 }}
                />
                <Background
                    key={`${currentPage}_current`}
                    $color={backgroundColor}
                    initial={{ y: fromY }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6 }}
                />
            </AnimatePresence>
            <AnimatePresence initial={false} custom={null}>
                {pageContents.map(({ id, component }, index) => (
                    <Section key={id} ref={sectionRefs[index]}>
                        <Container $currentPage={currentPage} id={id}>
                            {React.createElement(component, { urlGb })}
                        </Container>
                    </Section>
                ))}
            </AnimatePresence>
            <Dot onMenuClick={handleMenuClick} />
        </Wrapper>
    );
});

export default Border;

const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    overflow-y: auto;
`;

const Section = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    height: auto;
    color: white;
    position: relative;
`;

const Background = styled(motion.div)`
    position: fixed;
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
    max-width: 100%;
    height: auto;
    transition: opacity 1s ease;
    opacity: ${({ $currentPage, id }) => ($currentPage === id ? 1 : 0)};
`;
