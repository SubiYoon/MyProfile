import React from 'react';
import {
    AboutBox,
    AboutContainer,
    BottomContainer,
    ImgBox,
    NameBox,
    Photo,
    PhotoBox,
    ProfileContentBox,
    ProfileHeaderBox,
    ProfileLink,
    ProfileTitleSpan,
    ProfileTopContainer,
    ProfileWrapper,
    RightContainer,
    RoundButtonGreen,
    RoundButtonRed,
    RoundButtonYellow,
    SkillsContainer,
    TopIcon,
} from '@/components/Styled/ProfileStyledComponents.jsx';
import { useRecoilValue } from 'recoil';
import { profileState, stackState } from '@/recoil.js';
import Skills from '@/pages/Skills.jsx';

const Profile = React.memo(() => {
    // 프로필 정보
    const profileData = useRecoilValue(profileState);
    // 스킬 정보
    const stackData = useRecoilValue(stackState);

    if (!profileData || !stackData) {
        return <h2>Loading...</h2>;
    }

    const htmlString = profileData.detailIntroduceMyself;

    return (
        <ProfileWrapper>
            <ProfileTopContainer>
                <RoundButtonRed />
                <RoundButtonYellow />
                <RoundButtonGreen />
                -zsh
                <TopIcon src="/assets/icons/option.png" />
            </ProfileTopContainer>
            <AboutContainer>
                <ImgBox>
                    <PhotoBox>
                        <Photo
                            src={`/static/profile/${profileData.alias}/${profileData.image}`}
                        />
                    </PhotoBox>
                </ImgBox>
                <AboutBox>
                    <ProfileHeaderBox>
                        <span>{profileData.simpleIntroduceMyself}</span>
                    </ProfileHeaderBox>
                    <ProfileContentBox
                        dangerouslySetInnerHTML={{ __html: htmlString }}
                    />
                    <NameBox>
                        <ProfileTitleSpan>name:</ProfileTitleSpan>
                        <span>{profileData.name}</span>
                    </NameBox>
                    <NameBox>
                        <ProfileTitleSpan>addr:</ProfileTitleSpan>
                        <span>{profileData.addr}</span>
                    </NameBox>
                    <NameBox>
                        <ProfileTitleSpan>email:</ProfileTitleSpan>
                        <span>{profileData.email}</span>
                    </NameBox>
                    <NameBox>
                        <ProfileTitleSpan>gitHub:</ProfileTitleSpan>
                        <ProfileLink href={profileData.gitHub} target="_blank">
                            {profileData.gitHub}
                        </ProfileLink>
                    </NameBox>
                    <NameBox>
                        <ProfileTitleSpan>blog:</ProfileTitleSpan>
                        <ProfileLink href={profileData.blog} target="_blank">
                            {profileData.blog}
                        </ProfileLink>
                    </NameBox>
                    <SkillsContainer>
                        <Skills />
                    </SkillsContainer>
                </AboutBox>
            </AboutContainer>
            <RightContainer />
            <BottomContainer />
        </ProfileWrapper>
    );
});

export default Profile;
