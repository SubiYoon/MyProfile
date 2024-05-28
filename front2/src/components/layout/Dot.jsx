import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosInstance.js';
import { useRecoilState } from 'recoil';
import { currentPageState } from '@/recoil.js';
import { motion } from 'framer-motion';

const Dot = ({ onMenuClick }) => {
    const [menuData, setMenuData] = useState([]);
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

    useEffect(() => {
        console.log('메뉴 get 요청');
        const fetchMenuData = async () => {
            try {
                const response = await axiosInstance
                    .get('/api/menu/public')
                    .then(function (data) {
                        console.log('data', data);
                        data.data.menus[0].menuName = '';
                        return data;
                    });
                setMenuData(response.data.menus);
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        };
        fetchMenuData();
    }, []);

    const dotButtons = () => {
        return menuData.map((item) => (
            <React.Fragment key={item.menuSeq}>
                <MenuButton
                    onClick={() => handleButtonClick(item.menuSeq)}
                    $num={item.menuSeq}
                    $currentPage={currentPage}
                >
                    {item.menuName}
                </MenuButton>
                {currentPage === item.menuSeq ? (
                    <Dots
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: 1, scale: 1.6 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.4,
                            ease: [0, 0.71, 0.2, 1.01],
                            repeat: Infinity,
                        }}
                        $num={item.menuSeq}
                        $currentPage={currentPage}
                    />
                ) : (
                    <ClickableDots
                        onClick={() => handleButtonClick(item.menuSeq)}
                        $num={item.menuSeq}
                        $currentPage={currentPage}
                    />
                )}
            </React.Fragment>
        ));
    };

    const handleButtonClick = (page) => {
        setCurrentPage(page);
        onMenuClick(page);
    };

    return (
        <DotContainer>
            <DotBox>{dotButtons()}</DotBox>
            <IconBox
                nitial={{ y: 0 }} // 초기 위치
                animate={{ y: [0, -8, 0] }} // 움직임 설정
                transition={{ duration: 1, repeat: Infinity }}
            >
                {currentPage !== 4 ? (
                    <Icon
                        src="/assets/icons/down.png"
                        onClick={() => handleButtonClick(currentPage + 1)}
                    />
                ) : (
                    <Icon
                        src="/assets/icons/up.png"
                        onClick={() => handleButtonClick(1)}
                    />
                )}
            </IconBox>
        </DotContainer>
    );
};

export default Dot;

const DotContainer = styled.div`
    position: fixed;
    top: 40%;
    right: 3%;
    width: 10%;
    font-family: 'Freesentation';
`;

const MenuButton = styled.span`
    display: ${({ $currentPage, $num }) =>
        $currentPage === $num ? 'block' : 'none'};
    align-items: center;
    background-color: transparent;
    margin-bottom: 24%;
    border: none;
    color: black;
    font-size: ${({ theme }) => theme.fonts.mainFontSize};
    text-shadow: 8px 8px 4px rgba(230, 27, 57, 0.8);
    transform: translateY(
        ${({ $currentPage, $num }) => ($currentPage === $num ? '0' : '20px')}
    );
    transition:
        opacity 0.5s ease,
        transform 0.5s ease;
    &:hover {
        cursor: pointer;
        transform: translateY(0);
        opacity: 1;
    }
`;

const DotBox = styled.div`
    display: flex;
    float: right;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    width: 30%;
`;

const Dots = styled(motion.div)`
    width: 12px;
    height: 12px;
    margin-top: 30%;
    margin-bottom: 30%;
    border: 0.18rem solid rgba(230, 27, 57, 1);
    border-radius: 100%;
    background-color: ${({ $currentPage, $num }) =>
        $currentPage === $num ? 'rgba(230, 27, 57, 1)' : 'none'};
    &:hover {
        cursor: pointer;
        transform: scale(1.5);
    }
`;
const IconBox = styled(motion.div)`
    right: 3%;
    width: 60px;
    height: 60px;
    bottom: 18%;
    position: fixed;
`;

const Icon = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    &:hover {
        cursor: pointer;
        transform: scale(1.1);
    }
`;

const ClickableDots = styled(Dots)`
    pointer-events: auto; /* 클릭 이벤트 활성화 */
`;
