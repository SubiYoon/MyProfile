import { styled } from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
    currentPageState,
    apiState,
    stackState,
    profileState,
} from '@/recoil.js';
import Header from '@/pages/Header.jsx';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = React.memo(() => {
    // 프로필 정보
    const profileData = useRecoilValue(profileState);
    // 스킬 정보
    const stackData = useRecoilValue(stackState);
    const currentPage = useRecoilValue(currentPageState);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!profileData || !stackData) {
        return <h2>Loading...</h2>;
    }

    // 이미지 슬라이딩
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(
                (prevIndex) => (prevIndex + 1) % stackData.length,
            );
        }, 5000); // 5초마다 이미지 변경
        return () => clearInterval(interval);
    }, [stackData]);

    return (
        <>
            <AnimatePresence>
                <ProfileWrapper>
                    <ProfileContainer className="tests">
                        <ProfileHeader>
                            {profileData.simpleIntroduceMyself}
                        </ProfileHeader>
                        <ProfileContent>
                            {profileData.detailIntroduceMyself
                                ?.split(/(?<=[.,])/g) // Split by periods and commas, keeping them in the result
                                .map((sentence, index) => (
                                    <div key={index}>{sentence.trim()}</div>
                                ))}
                        </ProfileContent>
                    </ProfileContainer>
                    <IntroductionContainer>
                        <HeaderText>ABOUT ME</HeaderText>
                        <StackImageBox>
                            {stackData
                                .filter((item) => item.profileViewYn === 'Y')
                                .map((item, index) => (
                                    <StackImage
                                        key={item.stackSeq}
                                        src={`/static/stack/${item.stackImage}`}
                                        $index={index}
                                        style={{
                                            left: `${(index - currentImageIndex) * 600}px`,
                                        }}
                                    />
                                ))}
                        </StackImageBox>
                        <AboutContainer>
                            <ImgBox>
                                <PhotoBox>
                                    <Photo
                                        src={`/static/profile/${profileData.image}`}
                                    />
                                </PhotoBox>
                            </ImgBox>
                            <AboutBox>
                                <NameBox>
                                    <ProfileIcon src="/assets/icons/name.svg" />
                                    <ProfileText>
                                        {profileData.name}
                                    </ProfileText>
                                </NameBox>
                                <NameBox>
                                    <ProfileIcon src="/assets/icons/home.svg" />
                                    <ProfileText>
                                        {profileData.addr}
                                    </ProfileText>
                                </NameBox>
                                <NameBox>
                                    <ProfileIcon src="/assets/icons/email.svg" />
                                    <ProfileText>
                                        {profileData.email}
                                    </ProfileText>
                                </NameBox>
                                <NameBox>
                                    <ProfileIcon src="/assets/icons/git.svg" />
                                    <ProfileLink
                                        href={profileData.gitHub}
                                        target="_blank"
                                    >
                                        {profileData.gitHub}
                                    </ProfileLink>
                                </NameBox>
                                <NameBox>
                                    <ProfileIcon src="/assets/icons/blog.svg" />
                                    <ProfileLink
                                        href={profileData.blog}
                                        target="_blank"
                                    >
                                        {profileData.blog}
                                    </ProfileLink>
                                </NameBox>
                            </AboutBox>
                        </AboutContainer>
                    </IntroductionContainer>
                </ProfileWrapper>
            </AnimatePresence>
        </>
    );
});

export default Profile;

const ProfileWrapper = styled(motion.div)`
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 100%;
    font-family: 'Pretendard';
`;

const ProfileContainer = styled.div`
    padding: 0% 8% 2% 8%;
    text-align: center;
    color: black;
    position: relative; /* 가상 요소의 위치를 조정하기 위해 필요합니다 */

    &::after {
        content: '';
        position: absolute;
        left: 50%;
        width: 80%;
        border-top: 2px solid black;
    }

    &::after {
        bottom: 0;
        transform: translateX(-50%);
    }
`;

const IntroductionContainer = styled.div`
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3% 16% 6% 16%;
`;

const ProfileContent = styled.div`
    font-size: ${({ theme }) => theme.fonts.mainFontSize};
    font-family: 'Pretendard';
    white-space: nowrap;
`;

const NameBox = styled.div`
    font-size: ${({ theme }) => theme.fonts.mainFontSize};
    display: flex;
    margin-bottom: 16px;
`;

const ProfileText = styled.span``;

const ProfileLink = styled.a`
    text-decoration-line: none;
    &:visited {
        color: black; /* 방문한 링크의 색상 */
    }
    &:hover {
        color: ${({ theme }) => theme.colors.red};
    }
    &:active {
        color: black; /* 클릭한 후 색상 */
    }
`;

const ProfileIcon = styled.img`
    width: 40px;
    height: 40px;
    margin-right: 16px;
`;

const AboutContainer = styled.div`
    display: flex;
    width: 100%;
`;

const ImgBox = styled.div`
    float: left;
    width: 50%;
`;

const StackImageBox = styled.div`
    position: relative;
    width: 500px;
    height: 80px;
    overflow: hidden;
    top: -80px;
    left: 460px;
`;

const StackImage = styled.img`
    width: 80px;
    height: 80px;
    position: absolute;
    left: ${({ $index }) => $index * 240}px;
    transition: left 1s ease;
`;

const PhotoBox = styled.div`
    width: 280px;
    height: 280px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 6px 6px 6px gray;
    float: right;
`;

const Photo = styled.img`
    width: 100%;
    height: 100%;
`;

const AboutBox = styled.div`
    display: flex;
    float: right;
    width: 50%;
    flex-direction: column;
    padding-left: 60px;
`;

const HeaderText = styled.span`
    font-size: ${({ theme }) => theme.fonts.titleFontSize};
    font-weight: bolder;
    text-decoration: underline;
    text-underline-offset: 16px;
    text-decoration-thickness: 4px;
`;

const ProfileHeader = styled.p`
    text-align: center;
    font-size: ${({ theme }) => theme.fonts.titleFontSize};
    font-weight: bolder;
    text-shadow: 8px 8px 8px rgba(0, 0, 0, 0.3);
    font-family: 'Pretendard';
    text-decoration: underline;
    text-underline-offset: 16px;
    text-decoration-thickness: 4px;
`;
