import { styled } from 'styled-components';
import { motion } from 'framer-motion';

export const ProfileWrapper = styled(motion.div)`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 2% 0 2% 0;
    height: 100%;
    color: ${({ theme }) => theme.colors.white};
    font-family: 'menlo';
    font-size: ${({ theme }) => theme.fonts.smallFontSize};
    padding: 2% 0 1.5% 0;
    background-color: ${({ theme }) => theme.backgroundColors.darkGray};
    border-radius: 16px;
    position: relative;
    border-style: solid;
    border-color: rgb(117, 117, 120);
    border-width: 1px;
`;

export const ProfileTopContainer = styled.div`
    display: flex;
    position: absolute;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    top: 0;
    color: ${({ theme }) => theme.colors.white};
    font-weight: bold;
    font-size: ${({ theme }) => theme.fonts.normalFontSize};
    border-radius: 16px 16px 0 0;
    background-color: rgb(57, 56, 63);
    border-bottom-style: solid;
    border-bottom-color: rgb(3, 3, 7);
    border-width: 1px;
    z-index: 1;
`;

export const RoundButtonRed = styled.button`
    position: absolute;
    left: 1%;
    top: 24%;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background-color: rgb(251, 95, 90);
    border: none;
`;

export const RoundButtonYellow = styled.button`
    position: absolute;
    left: 4%;
    top: 24%;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background-color: rgb(253, 187, 50);
    border: none;
`;
export const RoundButtonGreen = styled.button`
    position: absolute;
    left: 7%;
    top: 24%;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background-color: rgb(45, 197, 66);
    border: none;
`;

export const TopIcon = styled.img`
    position: absolute;
    right: 1%;
    top: 24%;
    height: 22px;
    border: none;
`;

export const AboutContainer = styled.div`
    display: flex;
    padding: 16px;
`;

export const ImgBox = styled.div`
    display: flex;
    float: left;
    width: 45%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const PhotoBox = styled.div`
    overflow: hidden;
    border-radius: 12px;
`;

export const Photo = styled.img`
    width: 100%;
    height: 100%;
`;

export const AboutBox = styled.div`
    display: flex;
    float: right;
    width: 52%;
    flex-direction: column;
    padding-left: 2%;
`;

export const ProfileHeaderBox = styled.div`
    display: inline-block;
    margin-top: 0px;
    color: ${({ theme }) => theme.colors.yellow};
    span {
        border-bottom: 1px dashed rgb(244, 245, 246); /* Add dashed border to the span */
        padding-bottom: 2%; /* Adjust the distance between text and line */
    }
`;

export const ProfileContentBox = styled.div`
    margin-top: 4%;
    margin-bottom: 3%;
`;

export const NameBox = styled.div`
    display: flex;
    margin-bottom: 1%;
    align-items: center;
`;

export const ProfileTitleSpan = styled.span`
    margin-right: 1%;
    color: ${({ theme }) => theme.colors.yellow};
`;

export const ProfileLink = styled.a`
    text-decoration-line: none;
    &:visited {
        color: ${({ theme }) => theme.colors.white};
    }
    &:hover {
        color: ${({ theme }) => theme.colors.green};
    }
    &:active {
        color: ${({ theme }) => theme.colors.white};
    }
`;

export const SkillsContainer = styled.div`
    display: flex;
    height: 55%;
`;

export const BottomContainer = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    height: 30px;
    bottom: 0;
    border-radius: 0 0 16px 16px;
    background-color: rgb(50, 50, 53);
    border-top-style: solid;
    border-top-color: rgb(53, 56, 64);
    border-width: 1px;
    z-index: 1;
`;

export const RightContainer = styled.div`
    display: flex;
    position: absolute;
    width: 20px;
    border-radius: 16px;
    top: 2%;
    height: 97%;
    right: 0;
    background-color: rgb(51, 55, 65);
    border-left-style: solid;
    border-left-color: rgb(59, 63, 73);
    border-width: 1px;
`;
