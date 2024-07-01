import { styled } from 'styled-components';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance.js';

const DetailModal = ({ detailSeq, userGb }) => {
    const [detailData, setDetailData] = useState();

    useEffect(() => {
        const projectDetailData = async () => {
            try {
                const response = await axiosInstance.get(
                    `/api/project/${userGb}/${detailSeq}`,
                );
                setDetailData(response.data.projectDetailList);
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
                                src={`/static/images/detail/${detailData.image}`}
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
