import { useRecoilValue } from 'recoil';
import { careerState } from '@/recoil.js';
import {
    CompanyBox,
    CompanyDay,
    CompanyImage,
    CompanyImageBox,
    ProjectTextSpan,
    ProjectWrapper,
} from '@/components/Styled/ProjectStyledComponents.jsx';
import { styled } from 'styled-components';
import React from 'react';

const WorkHistory = () => {
    const careerData = useRecoilValue(careerState);

    console.log('커리어데이터', careerData);

    return (
        <ProjectWrapper>
            <TopSpan>C:\{careerData[0]?.alias}&gt;career</TopSpan>
            {careerData
                .filter((careerItem) => careerItem.inLevel !== '개인')
                .map((item) => (
                    <ContentBox key={item.careerSeq}>
                        <CompanyDay>
                            {item.out !== null
                                ? item.in + '~' + item.out
                                : item.in + ' ~ ing'}
                        </CompanyDay>
                        <CompanyBox>
                            <CompanyImageBox>
                                <CompanyImage
                                    src={`/static/logo/${item.companyLogo}`}
                                />
                            </CompanyImageBox>
                            <ProjectTextSpan>{item.company}</ProjectTextSpan>
                        </CompanyBox>
                        <ContentSpan>{item.inLevel}</ContentSpan>
                        <ContentLink href={item.companyUrl} target="_blank">
                            {item.companyUrl}
                        </ContentLink>
                    </ContentBox>
                ))}
        </ProjectWrapper>
    );
};
export default WorkHistory;

const TopSpan = styled.span`
    color: rgb(29, 183, 34);
`;
const ContentBox = styled.div`
    display: flex;
    margin-top: 2%;
`;
const ContentSpan = styled.span`
    margin-right: 1%;
    min-width: 50px;
`;

const ContentLink = styled.span`
    text-decoration-line: none;
    &:visited {
        color: ${({ theme }) => theme.colors.white};
    }
    &:hover {
        cursor: pointer;
        color: rgb(29, 183, 34);
    }
    &:active {
        color: ${({ theme }) => theme.colors.white};
    }
    margin-right: 1%;
`;
