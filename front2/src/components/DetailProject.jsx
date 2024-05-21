import React, { useState } from 'react';
import styled from 'styled-components';
import { color, motion } from 'framer-motion';
import ReactModal from 'react-modal';
import DetailModal from '@/components/DetailModal.jsx';
import { AiFillCloseCircle } from 'react-icons/ai';

const DetailProject = ({ clickProjectItem, userGb }) => {
    const [hoveredImage, setHoveredImage] = useState(null);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [detailSeq, setDetailSeq] = useState(null);
    const [detailTitle, setDetailTitle] = useState(null);

    // 각 카테고리별 스택 그룹화
    const stackGroups = {};
    clickProjectItem?.stackList.forEach((item) => {
        if (!stackGroups[item.category]) {
            stackGroups[item.category] = [];
        }
        stackGroups[item.category].push(item);
    });

    // 카테고리 정렬
    // const sortedCategories = Object.keys(stackGroups).sort();
    console.log('스택그룹', stackGroups);

    const sortedCategories = Object.keys(stackGroups).sort((a, b) => {
        return (
            stackGroups[b][0].categoryLevel - stackGroups[a][0].categoryLevel
        );
    });

    return (
        <>
            <DetailProjectContainer>
                <StackContainer>
                    <TitleBox>Skills</TitleBox>
                    {sortedCategories.map((category, index) => (
                        <CategoryBox key={index}>
                            <CategoryNameBox>
                                <CategoryName>{category}</CategoryName>
                            </CategoryNameBox>
                            {stackGroups[category].map((item) => (
                                <StackBox key={item.stackSeq}>
                                    <StackImg
                                        src={`/static/stack/${item.stackImage}`}
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
                            <DetailImageBox
                                key={item.projectDetailSeq}
                                onMouseEnter={() => setHoveredImage(index)}
                                onMouseLeave={() => setHoveredImage(null)}
                                onClick={() => {
                                    setModalIsOpen(true);
                                    setDetailSeq(item.projectDetailSeq);
                                    setDetailTitle(item.detailActTitle);
                                }}
                            >
                                <DetailProjectImage
                                    src={`/static/detail/${item.image}`}
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
                <ReactModal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Project Details"
                    shouldCloseOnOverlayClick={true}
                    overlayClassName="customOverlay"
                    className="customContent"
                >
                    <MotionOverlay
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.5,
                            ease: [0, 0.71, 0.2, 1.01],
                        }}
                    >
                        <MotionContent>
                            <ModalHeader>{detailTitle}</ModalHeader>
                            <DetailModal
                                detailSeq={detailSeq}
                                userGb={userGb}
                            />
                            <CloseButtonContainer>
                                <CloseIcon
                                    onClick={() => setModalIsOpen(false)}
                                />
                            </CloseButtonContainer>
                        </MotionContent>
                    </MotionOverlay>
                </ReactModal>
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
    font-size: ${({ theme }) => theme.fonts.largeFontSize};
    font-family: 'Impact', sans-serif;
`;

const DetailProjectContainer = styled.div`
    margin: 2% 0% 4% 0%;
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
    background-color: ${({ theme }) => theme.backgroundColors.title};
    font-size: ${({ theme }) => theme.fonts.mainFontSize};
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
    font-size: ${({ theme }) => theme.fonts.mainFontSize};
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
    border-radius: 16px;
`;

const StackList = styled.span`
    margin-left: 10px;
    font-size: ${({ theme }) => theme.fonts.normalFontSize};
    color: white;
`;

const DetailProjectContributeBox = styled.div`
    position: relative;
    padding: 2%;
    text-align: left;
    margin-bottom: 8%;
`;

const DetailProjectContribute = styled.span`
    font-size: ${({ theme }) => theme.fonts.normalFontSize};
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
    &:hover {
        transform: scale(1.1);
        cursor: pointer;
        transition: transform 0.3s ease;
        z-index: 1;
    }
`;

const DetailProjectImage = styled.img`
    width: 100%;
    height: 460px;
`;

const DetailProjectTitle = styled.div`
    width: 90%;
    position: absolute;
    top: 8%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1%;
    border-radius: 12px;
    border-style: solid;
    border-width: 1px;
    background-color: ${({ theme }) => theme.backgroundColors.title};
    font-size: ${({ theme }) => theme.fonts.normalFontSize};
    color: white;
    box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.9);
    z-index: 1;
`;

const MotionOverlay = styled(motion.div)`
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const MotionContent = styled(motion.div)`
    min-width: 70%;
    z-index: 150;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
    background-color: ${({ theme }) => theme.backgroundColors.modal};
    justify-content: center;
    border-color: ${({ theme }) => theme.backgroundColors.main};
    border-style: solid;
`;

const ModalHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundColors.main};
    padding: 1%;
    font-size: ${({ theme }) => theme.fonts.largeFontSize};
    text-align: center;
    font-weight: bolder;
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.26);
    font-family: 'mainFont';
`;

const CloseButtonContainer = styled.div`
    position: absolute;
    top: 2.4%;
    right: 2%;
    z-index: 100;
`;

const CloseIcon = styled(AiFillCloseCircle)`
    font-size: ${({ theme }) => theme.fonts.largeFontSize};
    &:hover {
        cursor: pointer;
    }
}

`;
