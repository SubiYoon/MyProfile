import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosInstance.js';
import { useRecoilState } from 'recoil';
import { currentPageState } from '@/recoil.js';
import { motion } from 'framer-motion';
import { ImProfile } from 'react-icons/im';
import { IoHome } from 'react-icons/io5';
import { GoProjectRoadmap } from 'react-icons/go';
import { SiStackoverflow } from 'react-icons/si';
import { PiStudentFill } from 'react-icons/pi';

const Dot = ({ onMenuClick }) => {
    const [menuData, setMenuData] = useState([]);
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
    const [color, setColor] = useState('white');

    const componentsMap = {
        Profile: Profile,
        Stack: Stack,
        Project: Project,
        Home: Home,
        Education: Education,
    };

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const response = await axiosInstance
                    .get('/api/menu/public')
                    .then(function (data) {
                        console.log('data', data);
                        return data;
                    });
                setMenuData(response.data.menus);
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        };
        fetchMenuData();
    }, []);

    useEffect(() => {
        console.log('zjff', color);
        if (currentPage === 1 || currentPage === 5) {
            setColor('white');
        } else {
            setColor('black');
        }
    }, [currentPage]);

    const dotButtons = () => {
        return menuData.map((item) => {
            const DynamicComponent = componentsMap[item.menuName];
            return (
                <React.Fragment key={item.menuSeq}>
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
                            $color={color}
                        >
                            {DynamicComponent && <DynamicComponent />}
                        </Dots>
                    ) : (
                        <ClickableDots
                            onClick={() => onMenuClick(item.menuSeq)}
                            $num={item.menuSeq}
                            $currentPage={currentPage}
                            $color={color}
                        >
                            {DynamicComponent && <DynamicComponent />}
                        </ClickableDots>
                    )}
                    <MenuButton
                        $num={item.menuSeq}
                        $currentPage={currentPage}
                        $color={color}
                    >
                        {item.menuName}
                    </MenuButton>
                </React.Fragment>
            );
        });
    };

    return (
        <DotContainer>
            <DotBox>
                <IconBox
                    nitial={{ y: 0 }} // 초기 위치
                    animate={{ y: [0, -8, 0] }} // 움직임 설정
                    transition={{ duration: 1, repeat: Infinity }}
                >
                    {/*<Icon*/}
                    {/*    src="/assets/icons/up.png"*/}
                    {/*    onClick={() => onMenuClick(currentPage - 1)}*/}
                    {/*/>*/}
                </IconBox>
                {dotButtons()}
                {/*<IconBox*/}
                {/*    nitial={{ y: 0 }} // 초기 위치*/}
                {/*    animate={{ y: [0, -8, 0] }} // 움직임 설정*/}
                {/*    transition={{ duration: 1, repeat: Infinity }}*/}
                {/*>*/}
                {/*    <Icon*/}
                {/*        src="/assets/icons/down.png"*/}
                {/*        onClick={() => onMenuClick(currentPage + 1)}*/}
                {/*    />*/}
                {/*</IconBox>*/}
            </DotBox>
        </DotContainer>
    );
};

export default Dot;

const DotContainer = styled.div`
    position: fixed;
    top: 28%;
    right: 3%;
    width: 10%;
    font-family: 'Freesentation';
`;

const MenuButton = styled.span`
    display: ${({ $currentPage, $num }) =>
        $currentPage === $num ? 'block' : 'none'};
    align-items: center;
    background-color: transparent;
    color: ${({ $color }) => $color};
    border: none;
    font-size: ${({ theme }) => theme.fonts.mainFontSize};
    text-shadow: 8px 8px 4px rgba(230, 27, 57, 0.8);
    transform: translateY(
        ${({ $currentPage, $num }) => ($currentPage === $num ? '0' : '20px')}
    );
    transition:
        opacity 0.5s ease,
        transform 0.5s ease;
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
    width: 30px;
    height: 30px;
    margin-top: 30%;
    margin-bottom: 30%;
    color: ${({ $currentPage, $num, $color }) =>
        $currentPage === $num ? 'rgba(230, 27, 57, 1)' : $color};
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        cursor: pointer;
        transform: scale(1.5);
    }
`;
const IconBox = styled(motion.div)`
    margin: 20% 0 20% 0;
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

const iconStyle = `
    width: 100%;
    height: 100%;
`;

const Profile = styled(ImProfile)`
    ${iconStyle}
`;
const Stack = styled(SiStackoverflow)`
    ${iconStyle}
`;
const Project = styled(GoProjectRoadmap)`
    ${iconStyle}
`;
const Home = styled(IoHome)`
    ${iconStyle}
`;
const Education = styled(PiStudentFill)`
    ${iconStyle}
`;
