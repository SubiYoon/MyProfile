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
                    <ModalImgBox>
                        <DetailProjectImageWrapper>
                            <DetailProjectImage
                                src={`/static/detail/${detailData.image}`}
                            />
                        </DetailProjectImageWrapper>
                    </ModalImgBox>
                    <ModalFontBox>
                        <ModalCont
                            dangerouslySetInnerHTML={{
                                __html: detailData?.detailActCont,
                            }}
                        />
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
    height: 100%;
    padding: 2%;
    align-items: center;
    justify-content: center;
`;

const ModalImgBox = styled.div`
    flex: 1;
    width: 50%;
    height: 100%;
    overflow: hidden;
    border-radius: 12px;
`;

const DetailProjectImageWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    margin: auto;
`;

const DetailProjectImage = styled.img`
    border-radius: 12px;
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지를 부모 요소에 맞게 크기 조정하되 비율을 유지 */
`;

const ModalFontBox = styled.div`
    display: flex;
    flex: 1;
    margin-left: 2%;
`;

const ModalCont = styled.span`
    text-align: left;
    font-size: ${({ theme }) => theme.fonts.smallFontSize};
`;
