import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentPageState, modeState } from '@/recoil.js';
import { AnimatePresence, motion } from 'framer-motion';
import Home from '@/pages/Home.jsx';
import Profile from '@/pages/Profile.jsx';
import Dot from '@/components/layout/Dot.jsx';
import PowerShell from '@/pages/PowerShell.jsx';
import BasicProject from '@/pages/BasicProject.jsx';
import BasicEducation from '@/pages/BasicEducation.jsx';

const Border = React.forwardRef(({ urlGb }, ref) => {
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
    const [backgroundColor, setBackgroundColor] = useState(null);
    const [previousBackgroundColor, setPreviousBackgroundColor] =
        useState(null);
    const prevPageRef = useRef(currentPage);
    const outerDivRef = useRef(null);
    const mode = useRecoilValue(modeState);

    const pageContents = [
        { id: 1, component: Home },
        { id: 2, component: Profile },
    ];

    if (mode === 'dev') {
        pageContents.push({ id: 3, component: PowerShell });
    } else {
        pageContents.push({ id: 3, component: BasicProject });
        pageContents.push({ id: 4, component: BasicEducation });
    }

    const sectionRefs = useRef([]);

    useEffect(() => {
        if (sectionRefs.current.length !== pageContents.length) {
            sectionRefs.current = Array(pageContents.length)
                .fill()
                .map((_, i) => sectionRefs.current[i] || React.createRef());
        }
    }, [pageContents.length]);

    useEffect(() => {
        const colorMap = {
            1: 'black',
            2: 'black',
            3: 'darkGray',
            4: 'darkGray',
        };

        setPreviousBackgroundColor(backgroundColor);
        setBackgroundColor(colorMap[currentPage]);

        prevPageRef.current = currentPage;
    }, [currentPage, mode]);

    useEffect(() => {
        const scrollHandler = () => {
            if (!outerDivRef.current) return;

            const { scrollTop, clientHeight } = outerDivRef.current;

            sectionRefs.current.forEach((ref, index) => {
                const section = ref.current;
                if (!section) return;
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
        sectionRefs.current[page - 1].current.scrollIntoView();
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
                    <Section key={id} ref={sectionRefs.current[index]}>
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
