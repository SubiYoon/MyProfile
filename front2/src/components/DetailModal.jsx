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
        console.log('gb', gb);
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
                console.log('디테일', response.data.projectDetailList);
                setDetailData(response.data.projectDetailList);

                const imageName =
                    response.data.projectDetailList?.image.split('.')[0];

                if (imageName) {
                    console.log('이미지네임', imageName);
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
                                    .catch((error) => {
                                        console.error(
                                            `Error fetching image: ${imagePath}`,
                                            error,
                                        );
                                    }),
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
                                        duration: 0.3,
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
                    <ModalFontBox>
                        <ModalCont>{detailData?.detailActCont}</ModalCont>
                    </ModalFontBox>
                </ModalWrapper>
            ) : null}
        </>
    );
};

export default DetailModal;

const ModalWrapper = styled.div`
    display: flex;
    color: white;
    font-family: profileFont;
    padding: 2%;
`;

const ModalImgBox = styled.div`
    flex: 1;
    height: 99%;
    width: 50%;
    height: 100%;
    overflow: hidden;
`;

const DetailProjectImageWrapper = styled.div`
    width: 100%;
    padding-top: 100%; /* 종횡비 8:10에 맞추어서 높이 설정 */
    position: relative;
`;

const DetailProjectImage = styled(motion.img)`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover; /* 이미지를 부모 요소에 맞게 크기 조정하되 비율을 유지 */
`;

const IconBox = styled.div`
    display: flex;
    font-size: 42px;
    justify-content: center;
    align-items: center;
`;

const Count = styled.span`
    font-family: mainFont;
    font-size: 26px;
    margin-bottom: 2px;
`;

const ModalFontBox = styled.div`
    flex: 1;
    width: 100%;
    margin-left: 2%;
    display: flex;
    flex-direction: column;
`;

const ModalCont = styled.p`
    text-align: left;
    font-size: 20px;
`;

const PrevIcon = styled(GrFormPrevious)`
    &:hover {
        transform: scale(1.2);
        cursor: pointer;
        opacity: 0.8;
    }
`;

const NextIcon = styled(GrFormNext)`
    &:hover {
        transform: scale(1.1);
        cursor: pointer;
        opacity: 0.8;
    }
`;
