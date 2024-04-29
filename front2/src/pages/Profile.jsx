import { styled } from 'styled-components';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance.js';
import { useRecoilState } from 'recoil';
import { currentPageState, userState, stackState } from '@/recoil.js';
import Header from '@/pages/Header.jsx';

const Profile = () => {
    //프로필 정보
    const [profileData, setProfileData] = useState(null); // 초기 상태를 null로 설정
    //스킬 정보
    const [stackData, setStackData] = useRecoilState(stackState);
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
    //유저 구분
    const [userGb, setUserGb] = useRecoilState(userState);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [detailIntroduce, setDetailIntroduce] = useState('');

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axiosInstance.get(`api/name/${userGb}`);
                setProfileData(response.data.profile);
                setStackData(response.data.stack);
                setDetailIntroduce(response.data.profile.simpleIntroduceMyself);
                console.log('확인값', detailIntroduce);
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        };
        fetchProfileData();
    }, []);

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
            <SideSpacer $currentPage={currentPage} />
            {profileData && stackData && (
                <ProfileWrapper $currentPage={currentPage}>
                    <ProfileContainer>
                        {currentPage === 2 ? (
                            <ProfileHeader>
                                <Header text={detailIntroduce} gb={'profile'} />
                            </ProfileHeader>
                        ) : null}
                        <ProfileContent>
                            {profileData.detailIntroduceMyself
                                .split('.')
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
                                        src={item.stackImage}
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
                                    <Photo src={profileData.image} />
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
            )}
            <SideSpacer $currentPage={currentPage} />
        </>
    );
};
export default Profile;

const ProfileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.92);
    font-family: 'profileFont';
    transition:
        transform 0.6s ease,
        opacity 0.6s ease;
    transform-style: preserve-3d;
    transform: ${({ $currentPage }) =>
        $currentPage === 2 ? 'rotateY(0deg)' : 'rotateY(90deg)'};
`;

const SideSpacer = styled.div`
    width: 230px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    transition:
        transform 0.6s ease,
        opacity 0.6s ease;
    transform-style: preserve-3d;
    transform: ${({ $currentPage }) =>
        $currentPage === 2 ? 'rotateY(0deg)' : 'rotateY(90deg)'};
`;

const ProfileContainer = styled.div`
    padding: 0% 8% 2% 8%; // 프로필 컨테이너 패딩 %
    background-color: rgba(0, 0, 0, 0.7);
    text-align: center;
`;

const IntroductionContainer = styled.div`
    color: black;
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3% 16% 6% 16%;
`;

const ProfileContent = styled.div`
    //width: 70%;
    font-size: 24px;
    font-family: 'profileFont';
    color: white;
`;

const NameBox = styled.div`
    display: flex;
    margin-bottom: 16px;
`;

const ProfileText = styled.span`
    font-size: 24px;
`;

const ProfileLink = styled.a`
    font-size: 24px;
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
    width: 260px;
    height: 260px;
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
    font-size: 64px;
    font-weight: bolder;
    text-decoration: underline;
    text-underline-offset: 16px;
    text-decoration-thickness: 4px;
`;
const ProfileHeader = styled.p`
    text-align: center;
    font-size: 64px;
    font-weight: bolder;
    text-shadow: 8px 8px 8px rgba(0, 0, 0, 0.3);
    font-family: 'profileFont';
    color: white;
    text-decoration: underline;
    text-underline-offset: 16px;
    text-decoration-thickness: 4px;
`;
