import { styled } from 'styled-components';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance.js';
import { useRecoilState } from 'recoil';
import { currentPageState, userState } from '@/recoil.js';

const Profile = () => {
    const [profileData, setProfileData] = useState(null); // 초기 상태를 null로 설정
    const [stackData, setStackData] = useState([]);
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
    const [userGb, setUserGb] = useRecoilState(userState);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axiosInstance.get(`api/name/${userGb}`);
                setProfileData(response.data.profile);
                setStackData(response.data.stack);
                console.log('프로필', profileData);
                console.log('스택', stackData);
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        };
        fetchProfileData();
    }, []);

    // 이미지 슬라이딩을 위한 함수
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
            {profileData && stackData && (
                <ProfileWrapper $currentPage={currentPage}>
                    <ProfileContainer>
                        <StackImageBox>
                            {stackData.map((item, index) => (
                                <StackImage
                                    key={item.stackSeq}
                                    src={item.stackImage}
                                    index={index}
                                    style={{
                                        left: `${(index - currentImageIndex) * 600}px`,
                                    }}
                                />
                            ))}
                        </StackImageBox>
                        <PhotoBox>
                            <Photo src={profileData.image} />
                        </PhotoBox>
                        <PersonalData>
                            <ProfileHeader>
                                {profileData.simpleIntroduceMyself}
                            </ProfileHeader>
                            <ProfileContent>
                                {profileData.detailIntroduceMyself
                                    .split('.')
                                    .map((sentence, index, array) => (
                                        <div key={index}>
                                            {sentence.trim()}
                                            {index !== array.length - 1 && '.'}
                                            <br />
                                            <br />
                                        </div>
                                    ))}
                            </ProfileContent>
                        </PersonalData>
                    </ProfileContainer>
                    <IntroductionContainer>
                        <NameBox>
                            <ProfileIcon src="/assets/icons/name.svg" />
                            <ProfileText>{profileData.name}</ProfileText>
                        </NameBox>
                        <NameBox>
                            <ProfileIcon src="/assets/icons/email.svg" />
                            <ProfileText>{profileData.email}</ProfileText>
                        </NameBox>
                        {/*<NameBox>*/}
                        {/*    <ProfileIcon src="/assets/icons/name.svg" />*/}
                        {/*    <ProfileText>{profileData.name}</ProfileText>*/}
                        {/*</NameBox>*/}
                    </IntroductionContainer>
                </ProfileWrapper>
            )}
        </>
    );
};
export default Profile;

const ProfileWrapper = styled.div`
    display: flex;
    width: 1600px;
    height: 800px;
    background-color: rgba(255, 255, 255, 0.92);
    border-radius: 16px;
    padding: 16px;
    transition:
        transform 0.6s ease,
        opacity 0.6s ease;
    transform-style: preserve-3d;
    transform: ${({ $currentPage }) =>
        $currentPage === 2 ? 'rotateY(0deg)' : 'rotateY(90deg)'};
`;

const ProfileContainer = styled.div`
    float: left;
    width: 600px;
    padding: 24px;
`;

const IntroductionContainer = styled.div`
    float: right;
    margin-left: 42px;
    width: 900px;
    display: table-cell;
    vertical-align: middle;
    padding: 120px;
`;

const PhotoBox = styled.div`
    width: 220px;
    height: 220px;
    margin: auto;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 6px 6px 6px gray;
`;

const Photo = styled.img`
    width: 100%;
    height: 100%;
`;

const PersonalData = styled.div`
    width: 100%;
    height: 60%;
    font-family: 'mainFont2';
    color: #282828;
    padding: 4px;
    overflow: hidden;
`;

const ProfileHeader = styled.p`
    text-align: center;
    font-size: 42px;
    text-shadow: 8px 8px 8px rgba(0, 0, 0, 0.3);
`;

const ProfileContent = styled.div`
    padding-top: 14px;
    font-size: 24px;
    color: black;
`;

const StackImageBox = styled.div`
    position: relative;
    width: 600px;
    height: 80px;
    overflow: hidden;
`;

const StackImage = styled.img`
    width: 180px;
    height: 80px;
    position: absolute;
    left: ${({ index }) => index * 240}px;
    transition: left 1s ease;
`;
const NameBox = styled.div`
    display: flex;
    width: 100%;
    display: flex;
    margin-bottom: 12px;
    //justify-content: center;
    font-family: profileFont;
`;

const ProfileText = styled.span`
    font-size: 24px;
    text-align: left;
    color: black;
`;

const ProfileIcon = styled.img`
    width: 40px;
    height: 40px;
    margin-right: 24px;
`;
