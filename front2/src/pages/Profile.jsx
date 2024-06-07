import { styled } from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentPageState, stackState, profileState } from '@/recoil.js';
import Header from '@/pages/Header.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { PiStudentFill } from 'react-icons/pi';
import { MdCalendarToday } from 'react-icons/md';
import Skills from '@/pages/Skills.jsx';

const Profile = React.memo(() => {
    // 프로필 정보
    const profileData = useRecoilValue(profileState);
    // 스킬 정보
    const stackData = useRecoilValue(stackState);

    if (!profileData || !stackData) {
        return <h2>Loading...</h2>;
    }

    return (
        <ProfileWrapper>
            <ProfileTop>
                <RoundButton />
                <RoundButton2 />
                <RoundButton3 />
                -zsh
                <TopIcon src="/assets/icons/option.png" />
            </ProfileTop>
            <AboutContainer>
                <ImgBox>
                    <PhotoBox>
                        <Photo src={`/static/profile/${profileData.image}`} />
                    </PhotoBox>
                </ImgBox>
                <AboutBox>
                    <ProfileHeader>
                        <span>{profileData.simpleIntroduceMyself}</span>
                    </ProfileHeader>
                    <ProfileContent>
                        {profileData.detailIntroduceMyself}
                    </ProfileContent>
                    <NameBox>
                        <ProfileTitle>name:</ProfileTitle>
                        <ProfileText>{profileData.name}</ProfileText>
                    </NameBox>
                    <NameBox>
                        <ProfileTitle>addr:</ProfileTitle>
                        <ProfileText>{profileData.addr}</ProfileText>
                    </NameBox>
                    <NameBox>
                        <ProfileTitle>email:</ProfileTitle>
                        <ProfileText>{profileData.email}</ProfileText>
                    </NameBox>
                    <NameBox>
                        <ProfileTitle>gitHub:</ProfileTitle>
                        <ProfileLink href={profileData.gitHub} target="_blank">
                            {profileData.gitHub}
                        </ProfileLink>
                    </NameBox>
                    <NameBox>
                        <ProfileTitle>blog:</ProfileTitle>
                        <ProfileLink href={profileData.blog} target="_blank">
                            {profileData.blog}
                        </ProfileLink>
                    </NameBox>
                    <SkillsContainer>
                        <Skills />
                    </SkillsContainer>
                </AboutBox>
            </AboutContainer>
            <Right />
            <Bottom />
        </ProfileWrapper>
    );
});

export default Profile;

const ProfileWrapper = styled(motion.div)`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 2% 0 2% 0;
    height: 100%;
    color: ${({ theme }) => theme.colors.white};
    font-family: 'D2Coding';
    font-size: ${({ theme }) => theme.fonts.smallFontSize};
    padding: 2% 0 1.5% 0;
    background-color: ${({ theme }) => theme.backgroundColors.darkGray};
    border-radius: 16px;
    position: relative;
    border-style: solid;
    border-color: rgb(117, 117, 120);
    border-width: 1px;
`;

const ProfileTop = styled.div`
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

const NameBox = styled.div`
    display: flex;
    margin-bottom: 1%;
    align-items: center;
    cp
`;

const ProfileText = styled.span``;

const ProfileLink = styled.a`
    text-decoration-line: none;
    &:visited {
        color: ${({ theme }) => theme.colors.yellow};
    }
    &:hover {
        color: ${({ theme }) => theme.colors.green};
    }
    &:active {
        color: ${({ theme }) => theme.colors.yellow};
    }
`;

const ProfileTitle = styled.span`
    margin-right: 1%;
    color: ${({ theme }) => theme.colors.yellow};
`;

const AboutContainer = styled.div`
    display: flex;
    padding: 16px;
`;

const ImgBox = styled.div`
    display: flex;
    float: left;
    width: 45%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const PhotoBox = styled.div`
    overflow: hidden;
    border-radius: 12px;
`;

const Photo = styled.img`
    width: 100%;
    height: 100%;
`;

const AboutBox = styled.div`
    display: flex;
    float: right;
    width: 52%;
    flex-direction: column;
    padding-left: 2%;
`;

const ProfileHeader = styled.div`
    display: inline-block;
    margin-top: 0px;
    color: ${({ theme }) => theme.colors.yellow};
    span {
        border-bottom: 1px dashed rgb(244, 245, 246); /* Add dashed border to the span */
        padding-bottom: 2%; /* Adjust the distance between text and line */
    }
`;

const ProfileContent = styled.div`
    margin-top: 4%;
    margin-bottom: 3%;
`;

const RoundButton = styled.button`
    position: absolute;
    left: 1%;
    top: 24%;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background-color: rgb(251, 95, 90);
    border: none;
`;

const RoundButton2 = styled.button`
    position: absolute;
    left: 4%;
    top: 24%;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background-color: rgb(253, 187, 50);
    border: none;
`;
const RoundButton3 = styled.button`
    position: absolute;
    left: 7%;
    top: 24%;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background-color: rgb(45, 197, 66);
    border: none;
`;

const TopIcon = styled.img`
    position: absolute;
    right: 1%;
    top: 24%;
    height: 22px;
    border: none;
    color: red;
`;

const Bottom = styled.div`
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

const Right = styled.div`
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

const SkillsContainer = styled.div`
    display: flex;
    height: 55%;
`;
