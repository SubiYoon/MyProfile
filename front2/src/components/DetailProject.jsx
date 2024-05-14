import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const DetailProject = ({ clickProjectItem, apiData }) => {
    const [hoveredImage, setHoveredImage] = useState(null);
    // 각 카테고리별 스택 그룹화
    const stackGroups = {};
    clickProjectItem?.stackList.forEach((item) => {
        if (!stackGroups[item.category]) {
            stackGroups[item.category] = [];
        }
        stackGroups[item.category].push(item);
    });

    return (
        <>
            <DetailProjectName>
                {clickProjectItem?.projectName}
            </DetailProjectName>
            <DetailProjectContainer>
                <StackContainer>
                    <TitleBox>Skills</TitleBox>
                    {Object.keys(stackGroups).map((category, index) => (
                        <CategoryBox key={index}>
                            <CategoryNameBox>
                                <CategoryName>{category}</CategoryName>
                            </CategoryNameBox>
                            {stackGroups[category].map((item) => (
                                <StackBox key={item.stackSeq}>
                                    <StackImg
                                        src={`${apiData}/stack/${item.stackImage}`}
                                    />
                                    <StackList>{item.stackName}</StackList>
                                </StackBox>
                            ))}
                        </CategoryBox>
                    ))}
                </StackContainer>
                <DetailProjectContributeBox>
                    <TitleBox>Purpose</TitleBox>
                    <DetailProjectContribute>
                        {clickProjectItem?.projectContributeRate}
                    </DetailProjectContribute>
                </DetailProjectContributeBox>
                <DetailProjectBox>
                    <TitleBox>Projects</TitleBox>
                    {clickProjectItem.projectDetailSemiList.map(
                        (item, index) => (
                            <DetailImageBox key={item.projectDetailSeq}>
                                <DetailProjectImage
                                    src={`${apiData}/detail/${item.image}`}
                                    onMouseEnter={() => setHoveredImage(index)}
                                    onMouseLeave={() => setHoveredImage(null)}
                                />
                                {hoveredImage === index && (
                                    <DetailProjectTitle>
                                        {item.detailActTitle}
                                    </DetailProjectTitle>
                                )}
                            </DetailImageBox>
                        ),
                    )}
                </DetailProjectBox>
            </DetailProjectContainer>
        </>
    );
};

export default DetailProject;

const DetailProjectName = styled(motion.div)`
    padding: 1%;
    border-radius: 12px;
    border-style: solid;
    border-width: 1px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.9);
    font-size: 46px;
    font-family: 'Impact', sans-serif;
`;

const DetailProjectContainer = styled.div`
    margin: 4% 0% 4% 0%;
    color: white;
    background-color: rgba(0, 0, 0, 0.8);
    box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.9);
    padding: 8px;
    border-radius: 16px;
`;

const StackContainer = styled.div`
    margin-top: 4%;
    margin-bottom: 10%;
    position: relative;
    font-family: mainFont;
`;

const TitleBox = styled(motion.div)`
    padding: 1%;
    position: absolute;
    top: -74px;
    left: -26px;
    border-radius: 12px;
    border-style: solid;
    border-width: 1px;
    background-color: rgba(0, 0, 0, 0.8);
    font-size: 26px;
    color: white;
    box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.9);
`;

const CategoryBox = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    flex-wrap: wrap;
`;

const CategoryNameBox = styled.div`
    width: 120px;
`;

const CategoryName = styled.span`
    font-size: 22px;
    font-weight: bolder;
    font-family: profileFont;
`;

const StackBox = styled.div`
    display: flex;
    align-items: center;
    margin: 1%;
`;

const StackImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 0%;
`;

const StackList = styled.span`
    margin-left: 10px;
    font-size: 18px;
    color: white;
`;

const DetailProjectContributeBox = styled.div`
    position: relative;
    padding: 2%;
    text-align: left;
    margin-bottom: 8%;
`;

const DetailProjectContribute = styled.span`
    font-size: 20px;
`;

const DetailProjectBox = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding: 2%;
`;

const DetailImageBox = styled.div`
    display: flex;
    position: relative;
    width: 50%;
`;

const DetailProjectImage = styled.img`
    width: 100%;
    height: 460px;
    &:hover {
        transform: scale(1.1);
        cursor: pointer;
        transition: transform 0.3s ease;
        z-index: 1;
    }
`;

const DetailProjectTitle = styled.div`
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1%;
    border-radius: 12px;
    border-style: solid;
    border-width: 1px;
    background-color: rgba(0, 0, 0, 0.8);
    font-size: 26px;
    color: white;
    box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.9);
    z-index: 2;
`;
