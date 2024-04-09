import styled from "styled-components";
import { useState } from "react";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <HeaderWrapper>
            <HeaderContainer className="HeaderContainer">
                <IconDiv onClick={() => setMenuOpen(!menuOpen)} open={menuOpen}>
                    {menuOpen ? (
                        <Icon open={menuOpen} src="/assets/icons/open.svg" />
                    ) : (
                        <Icon src="/assets/icons/close.svg" />
                    )}
                </IconDiv>
                <HeaderBox open={menuOpen}>
                    <MenuButton>메뉴 1</MenuButton>
                    <MenuButton>메뉴 2</MenuButton>
                    <MenuButton>메뉴 3</MenuButton>
                    <MenuButton>메뉴 4</MenuButton>
                    <MenuButton>메뉴 5</MenuButton>
                </HeaderBox>
            </HeaderContainer>
        </HeaderWrapper>
    );
};

export default Header;

const HeaderWrapper = styled.div`
    display: flex;
    z-index: 1;
    position: absolute;
    width: 20%;
    height: 100%;
    min-height: 620px;
    justify-content: center;
    align-items: center;
    float: left;
`;

const HeaderContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 160px;
    height: 100%;
`;

const IconDiv = styled.div`
    position: fixed;
    top: 50%;
    left: ${({ open }) => (open ? "172px" : "16px")};
    background-color: white;
    width: 50px;
    height: 50px;
    border-radius: 100px;
    cursor: pointer;
    opacity: 0.5;
    &:hover {
        opacity: 0.9;
    }
    transition: left 0.5s ease;
`;

const Icon = styled.img`
    margin-left: ${({ open }) => (open ? "-4px" : "4px")};
    width: 100%;
    height: 100%;
`;

const HeaderBox = styled.div`
    position: fixed;
    top: 0;
    left: ${({ open }) => (open ? "0px" : "-160px")};
    width: 160px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center; /* 메뉴 타이틀을 메뉴바의 최상단에 정렬 */
    align-items: center;
    transition: left 0.5s ease;
`;

const MenuButton = styled.button`
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 10px;
    border: none;
    cursor: pointer;
    width: 100px;
    margin-bottom: 10px;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: rgba(0, 0, 0, 0.7);
    }
`;
