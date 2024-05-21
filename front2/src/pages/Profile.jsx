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
import { motion } from 'framer-motion';

const Profile = () => {
    //프로필 정보
    const profileData = useRecoilValue(profileState);
    //스킬 정보
    const stackData = useRecoilValue(stackState);
    const currentPage = useRecoilValue(currentPageState);
    const apiData = useRecoilValue(apiState);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
            <ProfileWrapper
                initial={{
                    opacity: currentPage === 2 ? 0 : 1,
                    y: 20,
                    rotateY: currentPage === 2 ? 90 : 0,
                }}
                animate={{
                    opacity: currentPage !== 2 ? 0 : 1,
                    rotateY: currentPage !== 2 ? 90 : 0,
                }}
                transition={{ delay: 0.3, duration: 0.4 }}
            >
                <ProfileContainer>
                    {currentPage === 2 ? (
                        <ProfileHeader>
                            <Header
                                text={profileData.simpleIntroduceMyself}
                                gb={'profile'}
                            />
                        </ProfileHeader>
                    ) : null}
                    <ProfileContent>
                        {profileData.detailIntroduceMyself
                            ?.split('.')
                            .map((sentence, index, array) => (
                                <div key={index}>
                                    {sentence.trim()}
                                    {index !== array.length - 1 && '.'}
                                </div>
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
                                <ProfileText>{profileData.name}</ProfileText>
                            </NameBox>
                            <NameBox>
                                <ProfileIcon src="/assets/icons/home.svg" />
                                <ProfileText>{profileData.addr}</ProfileText>
                            </NameBox>
                            <NameBox>
                                <ProfileIcon src="/assets/icons/email.svg" />
                                <ProfileText>{profileData.email}</ProfileText>
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
        </>
    );
};
export default Profile;

const ProfileWrapper = styled(motion.div)`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.backgroundColors.main};
    font-family: 'profileFont';
`;

const ProfileContainer = styled.div`
    padding: 0% 8% 2% 8%;
    background-color: ${({ theme }) => theme.backgroundColors.black};
    text-align: center;
`;

const IntroductionContainer = styled.div`
    color: black;
    background-color: ${({ theme }) => theme.backgroundColors.white};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3% 16% 6% 16%;
`;

const ProfileContent = styled.div`
    font-size: ${({ theme }) => theme.fonts.mainFontSize};
    font-family: 'profileFont';
    color: white;
`;

const NameBox = styled.div`
    font-size: ${({ theme }) => theme.fonts.mainFontSize};
    display: flex;
    margin-bottom: 16px;
`;

const ProfileText = styled.span``;

const ProfileLink = styled.a`
    text-decoration-line: none;
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
    font-family: 'profileFont';
    color: white;
    text-decoration: underline;
    text-underline-offset: 16px;
    text-decoration-thickness: 4px;
`;
