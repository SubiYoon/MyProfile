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
                <ProfileWapper item={item} key={item.name}>
                    <ProfileContainer>
                        <PhotoBox>
                            <Photo src={item.image} />
                        </PhotoBox>
                        <PersonalData></PersonalData>
                    </ProfileContainer>
                    <IntroductionContainer></IntroductionContainer>
                </ProfileWapper>
            ))}
        </>
    );
};

export default Profile;

const ProfileWapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    border-style: solid;
    padding: 16px;
`;

const ProfileContainer = styled.div`
    float: left;
    width: 40%;
    padding: 24px;
`;

const IntroductionContainer = styled.div`
    float: right;
    width: 60%;
    border-style: solid;
`;

const PhotoBox = styled.div`
    width: 220px;
    height: 220px;
    margin: auto;
    border-radius: 200px;
    overflow: hidden;
    //padding: 4px;
`;

const Photo = styled.img`
    width: 220px;
    height: 280px;
`;

const PersonalData = styled.div`
    width: 100%;
    height: 300px;
    margin-top: 24px;
    border-style: solid;
`;
