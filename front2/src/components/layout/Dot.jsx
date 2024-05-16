import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosInstance.js';
import { useRecoilState } from 'recoil';
import { currentPageState } from '@/recoil.js';

const Dot = ({ onMenuClick }) => {
    const [menuData, setMenuData] = useState([]);
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

    useEffect(() => {
        console.log('메뉴 get 요청');
        const fetchMenuData = async () => {
            try {
                const response = await axiosInstance
                    .get('/api/menu')
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
            <Dots
                key={item.menuSeq}
                onClick={() => handleButtonClick(item.menuSeq)}
                $num={item.menuSeq}
                $currentPage={currentPage}
            />
        ));
    };

    const menuButtons = () => {
        return menuData.map((item) => (
            <MenuButton
                key={item.menuSeq}
                onClick={() => handleButtonClick(item.menuSeq)}
                $num={item.menuSeq}
                $currentPage={currentPage}
            >
                {item.menuName}
            </MenuButton>
        ));
    };

    const handleButtonClick = (page) => {
        setCurrentPage(page);
        onMenuClick(page);
    };

    return (
        <DotContainer>
            <ButtonBox>{menuButtons()}</ButtonBox>
            <DotBox>{dotButtons()}</DotBox>
        </DotContainer>
    );
};

export default Dot;

const DotContainer = styled.div`
    position: fixed;
    top: 40%;
    right: 24px;
    width: 10%;
`;

const ButtonBox = styled.div`
    width: 70%;
    height: 148px;
    float: left;
    text-align: right;
`;

const MenuButton = styled.button`
    display: flex;
    justify-content: right;
    align-items: center;
    width: 100%;
    height: 40px;
    margin-top: 4px;
    background-color: transparent;
    border: none;
    color: white;
    font-family: 'mainFont';
    font-size: 20px;
    text-shadow: 8px 8px 8px black;
    opacity: ${({ $currentPage, $num }) => ($currentPage === $num ? 1 : 0)};
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
    //background-color: red;
    height: 174px;
`;

const Dots = styled.div`
    width: 10px;
    height: 10px;
    margin-top: 16px;
    margin-bottom: 8px;
    border: 3px solid white;
    border-radius: 999px;
    background-color: ${({ $currentPage, $num }) =>
        $currentPage === $num ? 'white' : 'transparent'};
    transition-duration: 1000px;
    transition: background-color 0.5s;
    transform: scale(
        ${({ $currentPage, $num }) => ($currentPage === $num ? 1.5 : 1)}
    );
    &:hover {
        cursor: pointer;
        transform: scale(1.5);
    }
`;
