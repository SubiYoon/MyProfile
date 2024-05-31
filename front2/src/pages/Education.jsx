import { styled } from 'styled-components';
import { motion } from 'framer-motion';

const Education = () => {
    return (
        <EducationWrapper>
            <h2>교육이력</h2>
        </EducationWrapper>
    );
};

export default Education;

const EducationWrapper = styled(motion.div)`
    display: flex;
    flex-direction: column;
    width: 100%;
    font-family: 'Pretendard';
`;
