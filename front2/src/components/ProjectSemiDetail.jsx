import React, { useState } from 'react';
import {
    AboutContainer,
    DetailContentBox,
    DetailHeaderBox,
    ImgBox,
    Photo,
    ProjectSemiDetailWrapper,
} from '@/components/Styled/ProjectStyledComponents.jsx';

const ProjectSemiDetail = ({ item, scrollToBottom }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
        scrollToBottom(); // 이미지 로드 후 스크롤 아래로 내리기
    };

    return (
        <ProjectSemiDetailWrapper>
            <ImgBox>
                <Photo
                    src={`/static/detail/${item.image}`}
                    onLoad={handleImageLoad}
                />
            </ImgBox>
            <AboutContainer>
                <DetailHeaderBox>
                    <span> {item.detailActTitle}</span>
                </DetailHeaderBox>
                <DetailContentBox
                    dangerouslySetInnerHTML={{
                        __html: item.detailActCont,
                    }}
                />
            </AboutContainer>
        </ProjectSemiDetailWrapper>
    );
};

export default ProjectSemiDetail;
