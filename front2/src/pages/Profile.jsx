import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance.js';
import { useRecoilState } from 'recoil';
import { currentPageState } from '@/recoil.js';

const Profile = () => {
    const [profileData, setProfileData] = useState([]);
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axiosInstance.get('api/profile');
                console.log(response.data);
                setProfileData(response.data);
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        };
        fetchProfileData();
    }, [setProfileData]);

    return (
        <>
            {profileData.map((item) => (
                <ProfileWrapper key={item.name} $currentPage={currentPage}>
                    <ProfileContainer>
                        <PhotoBox>
                            <Photo src={item.image} />
                        </PhotoBox>
                        <PersonalData>
                            <ProfileHeader>
                                {item.simpleIntroduceMyself}
                            </ProfileHeader>
                            <ProfileContent>
                                {item.detailIntroduceMyself
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
                    <IntroductionContainer></IntroductionContainer>
                </ProfileWrapper>
            ))}
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
    width: 800px;
    border-style: solid;
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
    padding: 8px;
    margin-top: 24px;
    overflow: hidden;
`;

const ProfileHeader = styled.p`
    text-align: center;
    font-size: 42px;
    color: #364fc7;
    border-bottom-style: solid;
    box-shadow: 4px 6px 6px rgba(0, 0, 0, 0.4); /* 쉐도우 효과 조정 */
`;

const ProfileContent = styled.div`
    padding-top: 32px;
    font-size: 24px;
    color: black;
`;
