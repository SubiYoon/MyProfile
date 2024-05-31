import { styled } from 'styled-components';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance.js';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { motion } from 'framer-motion';

const DetailModal = ({ detailSeq, userGb }) => {
    const [detailData, setDetailData] = useState();
    const [imagePaths, setImagePaths] = useState([]);
    const [maxImages, setMaxImages] = useState(10);

    const [imageCount, setImageCount] = useState(1);
    const [countGb, setCountGb] = useState(false);

    const onClickGr = (gb) => {
        if (imageCount !== 1 && gb === 'prev') {
            setImageCount(imageCount - 1);
            setCountGb(false);
        } else if (imageCount !== imagePaths.length && gb === 'next') {
            setImageCount(imageCount + 1);
            setCountGb(true);
        }
    };

    useEffect(() => {
        const projectDetailData = async () => {
            try {
                const response = await axiosInstance.get(
                    `/api/project/${userGb}/${detailSeq}`,
                );
                setDetailData(response.data.projectDetailList);

                const imageName =
                    response.data.projectDetailList?.image.split('.')[0];

                if (imageName) {
                    const paths = [];

                    const fetchImagePaths = async () => {
                        const requests = [];
                        for (let i = 1; i <= maxImages; i++) {
                            const detailImage = `${imageName}${i}`;
                            const imagePath = `/static/detail/${imageName}/${detailImage}.png`;

                            requests.push(
                                axiosInstance
                                    .get(imagePath, {})
                                    .then((response) => {
                                        if (response.status === 200) {
                                            paths.push(imagePath);
                                        }
                                    })
                                    .catch((error) => {}),
                            );
                        }
                        await Promise.all(requests);
                        setImagePaths(paths);
                    };
                    await fetchImagePaths();
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        projectDetailData();
    }, [detailSeq]);

    return (
        <>
            {detailData ? (
                <ModalWrapper>
                    {imagePaths.length > 0 ? (
                        <ModalImgBox>
                            <DetailProjectImageWrapper>
                                <DetailProjectImage
                                    key={imageCount}
                                    animate={{
                                        x: 0,
                                    }}
                                    transition={{
                                        type: 'spring',
                                        x: {
                                            type: 'tween',
                                            from: countGb ? 1800 : -1800,
                                            tp: 0,
                                            duration: 0.5,
                                        },
                                        repeat: 1,
                                    }}
                                    src={`${imagePaths[imageCount - 1]}`}
                                />
                            </DetailProjectImageWrapper>
                            <IconBox>
                                <PrevIcon onClick={() => onClickGr('prev')} />
                                <Count>
                                    {imageCount}/{imagePaths.length}
                                </Count>
                                <NextIcon onClick={() => onClickGr('next')} />
                            </IconBox>
                        </ModalImgBox>
                    ) : null}
                    <ModalFontBox>
                        <ModalCont>
                            {detailData?.detailActCont
                                .split('.')
                                .map((sentence, index, array) => (
                                    <div key={index}>
                                        {sentence.trim()}
                                        {index !== array.length - 1 && '.'}
                                    </div>
                                ))}
                        </ModalCont>
                    </ModalFontBox>
                </ModalWrapper>
            ) : null}
        </>
    );
};

export default DetailModal;

const ModalWrapper = styled.div`
    display: flex;
    color: black;
    font-family: 'Pretendard';
    padding: 2%;
`;

const ModalImgBox = styled.div`
    flex: 1;
    height: 99%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    background-color: ${({ theme }) => theme.backgroundColors.lightBlack};
    border-radius: 12px;
`;

const DetailProjectImageWrapper = styled.div`
    display: flex;
    width: 94%;
    padding-top: 100%;
    position: relative;
    margin: auto;
`;

const DetailProjectImage = styled(motion.img)`
    position: absolute;
    border-radius: 12px;
    width: 100%;
    height: 100%;
    top: 2%;
    object-fit: cover; /* 이미지를 부모 요소에 맞게 크기 조정하되 비율을 유지 */
`;

const IconBox = styled.div`
    display: flex;
    font-size: ${({ theme }) => theme.fonts.largeFontSize};
    margin-top: 3%;
    margin-bottom: 1%;
    justify-content: center;
    align-items: center;
    color: rgba(228, 225, 220, 1);
`;

const Count = styled.span`
    font-family: 'Arita';
    color: rgba(228, 225, 220, 1);
    font-size: ${({ theme }) => theme.fonts.normalFontSize};
`;

const ModalFontBox = styled.div`
    flex: 1;
    width: 100%;
    margin-left: 2%;
    display: flex;
`;

const ModalCont = styled.span`
    text-align: left;
    font-size: ${({ theme }) => theme.fonts.mainFontSize};
`;

const PrevIcon = styled(GrFormPrevious)`
    &:hover {
        transform: scale(1.2);
        cursor: pointer;
        transition: 0.4s;
    }
`;

const NextIcon = styled(GrFormNext)`
    &:hover {
        transform: scale(1.2);
        cursor: pointer;
        transition: 0.4s;
    }
`;
