import React from 'react';
import {
    ProfileTopContainer,
    ProfileWrapper,
    RoundButtonGreen,
    RoundButtonRed,
    RoundButtonYellow,
    TopIcon,
    AboutContainer,
    ImgBox,
    PhotoBox,
    Photo,
    ProfileHeaderBox,
    AboutBox,
    ProfileContentBox,
    NameBox,
    ProfileTitleSpan,
    ProfileLink,
    SkillsContainer,
    BottomContainer,
    RightContainer,
} from '@/components/Styled/ProfileStyledComponents.jsx';
import { useRecoilValue } from 'recoil';
import { stackState, profileState } from '@/recoil.js';
import Skills from '@/pages/Skills.jsx';
import { renderToString } from 'react-dom/server';

const Profile = React.memo(() => {
    // 프로필 정보
    const profileData = useRecoilValue(profileState);
    // 스킬 정보
    const stackData = useRecoilValue(stackState);

    if (!profileData || !stackData) {
        return <h2>Loading...</h2>;
    }

    const htmlString = renderToString(
        <ProfileContentBox>
            {profileData.detailIntroduceMyself}
        </ProfileContentBox>,
    );

    console.log('html', htmlString);

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
                        <Photo src={`/static/profile/${profileData.image}`} />
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
