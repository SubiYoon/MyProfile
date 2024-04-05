import styled from "styled-components";


const Header = () => {

    return (
        <HeaderWapper>
            <IconDiv>
                <DownIcon src= "./down.svg"/>
                <HeaderContainer className="HeaderContainer">
                    <HeaderBox>
                        <h2>메뉴 아이콘 넣을 예정입니다.</h2>
                    </HeaderBox>
                </HeaderContainer>
            </IconDiv>
        </HeaderWapper>
    )
}

export default Header

const HeaderWapper = styled.div`
    display: flex;
    z-index: 1;
    position: absolute;
    width: 20%;
    height: 100%;
    min-height: 620px;
    justify-content: center;
    align-items: center;
    float: left;
`

const HeaderContainer = styled.div`
    position: fixed;
    //margin: auto;
    top: 0;
    left: 72px;
    width: 160px;
    height: 100%;
    //height: 520px;
    //background-color: #dbe4ff;
    overflow: hidden;
    display: none;
`

const IconDiv = styled.div`
    position: fixed;
    top: 50%;
    left: 1%;
    background-color: white;
    width: 50px;
    height: 50px;
    border-radius: 100px;
    cursor: pointer;
    opacity: 0.5;
    &:hover{
        opacity: 0.9;
        display: none;
        .HeaderContainer {
            display: flex;
            transform: scale(1.02, 1.02); /* 가로2배 새로 1.2배 로 커짐 */
            transition: 0.8s;
        }
    }
`

const DownIcon = styled.img`
    margin-left: 4px;
    margin-top: 4px;
    transform: rotate(270deg);
    &:hover{
            margin-left: 0;
            margin-right: 4px;
            transform: rotate(90deg);
        }
  //border-radius: 100px;
`;

const HeaderBox = styled.div`
    background-color: #edf2ff;
`;
