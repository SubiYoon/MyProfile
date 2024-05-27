import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { color, motion } from 'framer-motion';
import ReactModal from 'react-modal';
import DetailModal from '@/components/DetailModal.jsx';
import { AiFillCloseCircle } from 'react-icons/ai';

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
                stackGroups[b][0].categoryLevel -
                stackGroups[a][0].categoryLevel
            );
        });
    }, [stackGroups]);

    const openModal = (item) => {
        setDetailSeq(item.projectDetailSeq);
        setDetailTitle(item.detailActTitle);
    };

    const closeModal = () => {
        setDetailSeq(null);
        setDetailTitle(null);
    };

    console.log('스택그룹', stackGroups);

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
                        {clickProjectItem.projectContributeRate
                            ?.split('.')
                            .map((sentence, index, array) => (
                                <div key={index}>
                                    {sentence.trim()}
                                    {index !== array.length - 1 && '.'}
                                </div>
                            ))}
                    </DetailProjectContribute>
                </DetailProjectContributeBox>
                <DetailProjectBox>
                    <TitleBox>Detail</TitleBox>
                    <DetailImageContainer>
                        {clickProjectItem.projectDetailSemiList.map(
                            (item, index) => (
                                <DetailImageBox
                                    key={item.projectDetailSeq}
                                    onMouseEnter={() => setHoveredImage(index)}
                                    onMouseLeave={() => setHoveredImage(null)}
                                    onClick={() => {
                                        openModal(item);
                                        setModalIsOpen(true);
                                    }}
                                >
                                    <DetailProjectImage
                                        src={`/static/detail/${item.image}`}
                                    />
                                    {hoveredImage === index && (
                                        <>
                                            <DetailProjectTitle>
                                                {item.detailActTitle}
                                            </DetailProjectTitle>
                                            <DetailProjectClick>
                                                click
                                            </DetailProjectClick>
                                        </>
                                    )}
                                </DetailImageBox>
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
});

export default DetailProject;

const DetailProjectContainer = styled.div`
    color: black;
    padding: 6% 0% 2% 0%;
`;

const StackContainer = styled.div`
    margin-bottom: 5%;
    position: relative;
    color: white;
    font-family: 'Pretendard';
    background-color: ${({ theme }) => theme.backgroundColors.lightBlack};
    border-radius: 12px;
`;

const TitleBox = styled(motion.div)`
    width: 100%;
    padding: 0% 0% 0.4% 1%;
    position: absolute;
    text-align: left;
    top: -40px;
    left: -26px;
    color: ${({ theme }) => theme.colors.red};
    font-size: ${({ theme }) => theme.fonts.mainFontSize};
    font-family: 'Freesentation';
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
    position: relative;
    align-items: center;
    flex-wrap: wrap;
`;

const CategoryNameBox = styled.div`
    width: 120px;
`;

const CategoryName = styled.span`
    font-size: ${({ theme }) => theme.fonts.normalFontSize};
    font-weight: bolder;
    font-family: 'NanumSquareNeo';
`;

const StackBox = styled.div`
    display: flex;
    align-items: center;
    margin: 0.8%;
`;

const StackImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 16px;
`;

const StackList = styled.span`
    margin-left: 10px;
    font-size: ${({ theme }) => theme.fonts.smallFontSize};
`;

const DetailProjectContributeBox = styled.div`
    position: relative;
    background-color: ${({ theme }) => theme.backgroundColors.lightBlack};
    border-radius: 12px;
    color: white;
    text-align: left;
    padding: 1%;
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
    width: 100%;
    height: 100%;
    padding: 1% 0% 1% 0%;
`;

const DetailImageBox = styled.div`
    display: flex;
    border-radius: 12px;
    margin: 0 0px 0 10px;
    position: relative;
    width: 32.3%;
    &:hover {
        transform: scale(1.2);
        cursor: pointer;
        transition: transform 0.3s ease;
        z-index: 1;
    }
    overflow: hidden;
`;

const DetailProjectImage = styled.img`
    width: 100%;
    height: 380px;
`;

const DetailProjectTitle = styled.div`
    width: 100%;
    position: absolute;
    top: 4%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1%;

    background-color: ${({ theme }) => theme.backgroundColors.black};
    font-size: ${({ theme }) => theme.fonts.normalFontSize};
    color: ${({ theme }) => theme.colors.white};
    //box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.9);
    z-index: 1;
`;

const DetailProjectClick = styled.div`
    width: 100%;
    position: absolute;
    top: 96%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1%;

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
    background-color: ${({ theme }) => theme.backgroundColors.black};
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
    font-family: 'Pretendard';
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
