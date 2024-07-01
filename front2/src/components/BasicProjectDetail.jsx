import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ReactModal from 'react-modal';
import { AiFillCloseCircle } from 'react-icons/ai';
import BasicModal from '@/components/BasicModal.jsx';

const DetailProject = React.memo(({ clickProjectItem, userGb }) => {
    const [hoveredImage, setHoveredImage] = useState(null);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [detailSeq, setDetailSeq] = useState(null);
    const [detailTitle, setDetailTitle] = useState(null);

    // 각 카테고리별 스택 그룹화
    const stackGroups = useMemo(() => {
        const groups = {};
        clickProjectItem?.stackList.forEach((item) => {
            if (!groups[item.category]) {
                groups[item.category] = [];
            }
            groups[item.category].push(item);
        });
        return groups;
    }, [clickProjectItem]);

    // 카테고리 정렬
    const sortedCategories = useMemo(() => {
        return Object.keys(stackGroups).sort((a, b) => {
            return (
                stackGroups[a][0].categoryLevel -
                stackGroups[b][0].categoryLevel
            );
        });
    }, [stackGroups]);

    const openModal = (item) => {
        setDetailSeq(item.projectDetailSeq);
        setDetailTitle(item.detailActTitle);
    };

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
                                        src={`/static/images/stack/${item.stackImage}`}
                                    />
                                    <StackList>{item.stackName}</StackList>
                                </StackBox>
                            ))}
                        </CategoryBox>
                    ))}
                </StackContainer>
                <DetailProjectContributeBox>
                    <TitleBox>Purpose</TitleBox>
                    <DetailProjectContribute
                        dangerouslySetInnerHTML={{
                            __html: clickProjectItem.projectContributeRate,
                        }}
                    />
                </DetailProjectContributeBox>
                <DetailProjectBox>
                    <TitleBox>Detail</TitleBox>
                    <DetailImageContainer>
                        {clickProjectItem.projectDetailSemiList.map(
                            (item, index) => (
                                <DetailBox key={item.projectDetailSeq}>
                                    <DetailImageBox
                                        onMouseEnter={() =>
                                            setHoveredImage(index)
                                        }
                                        onMouseLeave={() =>
                                            setHoveredImage(null)
                                        }
                                        onClick={() => {
                                            openModal(item);
                                            setModalIsOpen(true);
                                        }}
                                    >
                                        <DetailProjectImage
                                            src={`/static/images/detail/${item.image}`}
                                        />
                                        {hoveredImage === index && (
                                            <DetailProjectClick>
                                                click
                                            </DetailProjectClick>
                                        )}
                                    </DetailImageBox>
                                    <DetailTitleBox>
                                        <DtailTitleFont>
                                            {item.detailActTitle}
                                        </DtailTitleFont>
                                    </DetailTitleBox>
                                </DetailBox>
                            ),
                        )}
                    </DetailImageContainer>
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
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: 1,
                            ease: [0, 0.71, 0.2, 1.01],
                        }}
                    >
                        <MotionContent>
                            <ModalHeader>
                                {detailTitle}
                                <CloseIcon
                                    onClick={() => setModalIsOpen(false)}
                                />
                            </ModalHeader>
                            <BasicModal detailSeq={detailSeq} userGb={userGb} />
                        </MotionContent>
                    </MotionOverlay>
                </ReactModal>
            </DetailProjectContainer>
        </>
    );
});

export default DetailProject;

const DetailProjectContainer = styled.div`
    color: black;
    padding: 4% 0 2% 0;
`;

const StackContainer = styled.div`
    margin-bottom: 5%;
    position: relative;
    color: white;
    flex-wrap: wrap;
    display: flex;
    background-color: ${({ theme }) => theme.backgroundColors.lightBlack};
    border-radius: 12px;
    padding: 1% 1% 0 1%;
`;

const TitleBox = styled(motion.div)`
    width: 100%;
    padding: 0 0 0.4% 1%;
    position: absolute;
    text-align: left;
    top: -40px;
    left: -26px;
    color: ${({ theme }) => theme.colors.red};
    font-size: ${({ theme }) => theme.fonts.mainFontSize};
    &::after {
        content: '';
        display: block;
        width: 90%; /* 하단 경계선의 길이 조절 */
        height: 2px; /* 경계선의 두께 */
        background-color: ${({ theme }) =>
            theme.colors.red}; /* 경계선의 색상 */
        position: absolute;
        bottom: 0; /* 하단에 위치 */
        left: 4.6%; /* 경계선을 중앙으로 정렬 */
    }
`;

const CategoryBox = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 0 auto;
    min-width: 16%;
`;

const CategoryNameBox = styled.div`
    margin-bottom: 24px;
    background-color: ${({ theme }) => theme.backgroundColors.beige};
    color: black;
    padding: 2%;
    border-radius: 16px;
`;

const CategoryName = styled.span`
    font-size: ${({ theme }) => theme.fonts.normalFontSize};
    font-weight: bolder;
`;

const StackBox = styled.div`
    width: 100%;
    margin-bottom: 16%;
    display: flex;
    align-items: center;
    justify-content: left;
`;

const StackImg = styled.img`
    margin-right: 8px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

const StackList = styled.span`
    text-align: center;

    font-size: ${({ theme }) => theme.fonts.smallFontSize};
`;

const DetailProjectContributeBox = styled.div`
    position: relative;
    background-color: ${({ theme }) => theme.backgroundColors.lightBlack};
    border-radius: 12px;
    color: white;
    text-align: left;
    padding: 1% 2% 1% 2%;
    margin-bottom: 5%;
`;

const DetailProjectContribute = styled.span`
    font-size: ${({ theme }) => theme.fonts.normalFontSize};
`;

const DetailProjectBox = styled.div`
    position: relative;
`;

const DetailImageContainer = styled.div`
    background-color: ${({ theme }) => theme.backgroundColors.lightBlack};
    display: flex;
    border-radius: 12px;
    flex-wrap: wrap;
    padding: 1% 0 0 0;
`;

const DetailBox = styled.div`
    background-color: ${({ theme }) => theme.backgroundColors.beige};
    border-radius: 12px;
    width: 47.5%;
    margin: 0 0 1% 1%;
    padding: 1% 0 1% 1%;
    display: flex;
`;

const DetailImageBox = styled.div`
    display: flex;
    position: relative;
    width: 50%;
    height: 200px;
    &:hover {
        transform: scale(1.16);
        cursor: pointer;
        transition: transform 0.3s ease;
        z-index: 1;
    }
    overflow: hidden;
`;

const DetailTitleBox = styled.div`
    width: 50%;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin-left: 1%;
`;

const DtailTitleFont = styled.div`
    font-size: ${({ theme }) => theme.fonts.normalFontSize};
    font-weight: bold;
    margin-top: 10%;
    margin-bottom: 6%;
`;

const DetailProjectImage = styled.img`
    border-radius: 12px;
    width: 100%;
`;

const DetailProjectClick = styled.div`
    width: 98.5%;
    position: absolute;
    top: 4%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1%;
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;

    background-color: ${({ theme }) => theme.backgroundColors.black};
    font-size: ${({ theme }) => theme.fonts.normalFontSize};
    color: ${({ theme }) => theme.colors.red};
    //box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.9);
    z-index: 1;
`;

const MotionOverlay = styled(motion.div)`
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.backgroundColors.lightBlack};
`;

const MotionContent = styled(motion.div)`
    min-width: 70%;
    z-index: 150;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 12px;
    background-color: ${({ theme }) => theme.backgroundColors.beige};
    justify-content: center;
    border-style: solid;
    border-color: rgba(228, 225, 220, 1);
`;

const ModalHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundColors.lightBlack};
    padding: 2%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: white;
    font-size: ${({ theme }) => theme.fonts.largeFontSize};
    text-align: center;
    font-weight: bolder;
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.26);
`;

const CloseIcon = styled(AiFillCloseCircle)`
    float: right;
    font-size: ${({ theme }) => theme.fonts.largeFontSize};
    color: ${({ theme }) => theme.colors.beige};
    &:hover {
        cursor: pointer;
        transform: scale(1.1);
        transition: 0.4s;
    }
}

`;
