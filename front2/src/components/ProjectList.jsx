import React from 'react';
import {
    ProjectListWrapper,
    TitleBox,
    ProjectListBox,
    ProjectTextSpan,
    CareerBox,
    CompanyImageBox,
    CompanyImage,
    ProjectDay,
    CompanyBox,
    CompanyDay,
    ProjectNameBox,
    ProjectTextBox,
} from '@/components/Styled/ProjectStyledComponents.jsx';

const ProjectList = ({ allProjects, careerData }) => {
    return (
        <ProjectListWrapper>
            <TitleBox>
                <ProjectTextSpan>total {allProjects.length}</ProjectTextSpan>
            </TitleBox>
            {allProjects.map((item) => (
                <ProjectListBox key={item.projectSeq}>
                    {careerData
                        .filter(
                            (careerItem) =>
                                careerItem.careerSeq ===
                                item.careerSeq.toString(),
                        )
                        .map((careerItem) => (
                            <CareerBox key={careerItem.careerSeq}>
                                <CompanyDay>
                                    {careerItem.in} ~{' '}
                                    {careerItem.out ? careerItem.out : 'ing'}
                                </CompanyDay>
                                <CompanyBox>
                                    <CompanyImageBox>
                                        <CompanyImage
                                            src={`/static/logo/${careerItem.companyLogo}`}
                                        />
                                    </CompanyImageBox>
                                    <ProjectTextSpan>
                                        {careerItem.company}
                                    </ProjectTextSpan>
                                </CompanyBox>
                            </CareerBox>
                        ))}
                    <ProjectTextBox>
                        <ProjectDay>{item.projectTerm}</ProjectDay>
                        <ProjectNameBox>{item.projectName}</ProjectNameBox>/
                    </ProjectTextBox>
                </ProjectListBox>
            ))}
        </ProjectListWrapper>
    );
};

export default ProjectList;
