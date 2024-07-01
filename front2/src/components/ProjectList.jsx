import React, { useMemo } from 'react';
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
    ContentLink,
} from '@/components/Styled/ProjectStyledComponents.jsx';

const ProjectList = ({
    allProjects,
    careerData,
    firstCheck,
    careerSeq,
    count,
}) => {
    return (
        <ProjectListWrapper>
            <TitleBox>
                <ProjectTextSpan>
                    total {firstCheck ? careerData.length : count}
                </ProjectTextSpan>
            </TitleBox>
            {firstCheck
                ? [...careerData]
                      .sort((a, b) => new Date(b.in) - new Date(a.in))
                      .map((careerItem) => (
                          <CareerBox key={careerItem.careerSeq}>
                              <CompanyDay>
                                  {careerItem.in} ~{' '}
                                  {careerItem.out ? careerItem.out : 'ing'}
                              </CompanyDay>
                              <ProjectTextSpan>
                                  {careerItem.inLevel}
                              </ProjectTextSpan>
                              <ContentLink
                                  href={careerItem.companyUrl}
                                  target="_blank"
                              >
                                  {careerItem.companyUrl}
                              </ContentLink>
                              <CompanyBox>
                                  <CompanyImageBox>
                                      <CompanyImage
                                          src={`/static/images/career/${careerItem.companyLogo}`}
                                      />
                                  </CompanyImageBox>
                                  <ProjectNameBox>
                                      {careerItem.company}
                                  </ProjectNameBox>
                                  /
                              </CompanyBox>
                          </CareerBox>
                      ))
                : allProjects
                      .filter(
                          (item) =>
                              item.careerSeq.toString() ===
                              careerSeq.toString(),
                      )
                      .map((item) => (
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
                                              {careerItem.out
                                                  ? careerItem.out
                                                  : 'ing'}
                                          </CompanyDay>
                                          <CompanyBox>
                                              <CompanyImageBox>
                                                  <CompanyImage
                                                      src={`/static/images/career/${careerItem.companyLogo}`}
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
                                  <ProjectNameBox>
                                      {item.projectName}
                                  </ProjectNameBox>
                                  /
                              </ProjectTextBox>
                          </ProjectListBox>
                      ))}
        </ProjectListWrapper>
    );
};

export default ProjectList;
