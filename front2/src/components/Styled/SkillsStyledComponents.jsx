import styled from 'styled-components';
import { motion } from 'framer-motion';

export const SkillsWrapper = styled(motion.div)`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    color: white;
    overflow: hidden;
`;

export const TitleContainer = styled.div`
    display: flex;
    color: white;
    align-items: center;
    @media screen and (max-width: 768px) {
        margin-top: 4%;
    }
`;

export const TitleHeaderP = styled.p`
    flex-wrap: wrap;
    color: rgb(253, 164, 1);
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const TitleSkillsP = styled.p`
    font-weight: ${({ $isActive }) => ($isActive ? 'bold' : null)};
    margin: auto;
    color: ${({ $isActive, theme }) =>
        $isActive ? theme.colors.green : 'none'};
    text-decoration-line: ${({ $isActive }) =>
        $isActive ? 'underline' : 'none'};
    text-underline-offset: 8px;
    text-decoration-thickness: 1px;
    &:hover {
        transition: 0.4s;
        cursor: pointer;
        transform: scale(1.1);
    }
`;

export const SkillsContainer = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: 50%;
    padding-left: 3%;
    flex-wrap: wrap;
    margin: 0 auto;
    @media screen and (max-width: 768px) {
        height: 100%;
        margin-bottom: 60px;
    }
`;

export const SkillBox = styled(motion.div)`
    position: ${({ $isActive }) => ($isActive ? 'relative' : 'absolute')};
    width: 25%;
    height: 60px;
    border-style: dashed;
    border-radius: 12px;
    border-width: 2px;
    margin: 32px 26px 0 26px;
    transition:
        transform 0.6s ease,
        opacity 0.6s ease;
    transform-style: preserve-3d;
    transform: ${({ $isActive }) =>
        $isActive ? 'rotateY(0deg)' : 'rotateY(90deg)'};
    visibility: ${({ $isActive }) => ($isActive ? 'visible' : 'hidden')};
    @media screen and (max-width: 768px) {
        width: 32%;
        height: 40px;
        margin: 32px 20px 0 20px;
    }
`;
export const StackImage = styled.img`
    width: 50px;
    height: 50px;
    position: absolute;
    left: -36px;
    top: -26px;
    border-radius: 16px;
    border-width: 2px;
    border-style: solid;
    transform: rotate(-10deg);
    background-color: ${({ theme }) => theme.backgroundColors.darkGray};
    @media screen and (max-width: 768px) {
        width: 30px;
        height: 30px;
        left: -20px;
        top: -16px;
        border-radius: 12px;
        border-width: 1px;
    }
`;

export const SkillNameP = styled.p`
    text-align: center;
    margin-top: 16px;
    text-decoration-line: underline;
    text-underline-offset: 6px;
    text-decoration-thickness: 1px;
`;

export const ScrollPrevButton = styled.button`
    position: absolute;
    top: 91.5%;
    left: 69.8%;
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        color: ${({ theme }) => theme.colors.green};
    }

    @media screen and (max-width: 768px) {
        top: 93%;
        left: 40%;
    }
`;

export const ScrollNextButton = styled.button`
    position: absolute;
    top: 91.5%;
    left: 73.4%;
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        color: ${({ theme }) => theme.colors.green};
    }
    @media screen and (max-width: 768px) {
        top: 93%;
        left: 49.6%;
    }
`;
export const ScrollCountBox = styled.div`
    position: absolute;
    margin-top: 0.2%;
    padding: 0 0.5% 0 0.2%;
    top: 91%;
    left: 71.4%;
    @media screen and (max-width: 768px) {
        margin-top: 0.8%;
        top: 93%;
        left: 46.4%;
    }
`;
