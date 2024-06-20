import styled from 'styled-components';

export const ProjectWrapper = styled.div`
    width: 100%;
    @media screen and (max-width: 768px) {
        font-size: ${({ theme }) => theme.fonts.mobile.smallFontSize};
    }
`;
export const ProjectTopContainer = styled.div`
    display: flex;
`;
export const ProjectTitle = styled.span`
    color: rgb(24, 119, 1);
    margin-right: 12px;
`;

export const ProjectTitle2 = styled.span`
    color: rgb(176, 71, 197);
    margin: 0 12px 0 0;
`;

export const ProjectTitle3 = styled.span`
    color: rgb(190, 159, 1);
`;

export const ProjectDetailContainer = styled.div`
    margin: 0 0 12px 0;
    width: 100%;
`;

export const ProjectListWrapper = styled.div`
    margin-bottom: 12px;
    flex-wrap: wrap;
    @media screen and (max-width: 768px) {
        display: flex;
        width: 100%;
    }
`;

export const TitleBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const ProjectListBox = styled.div`
    display: flex;
    align-items: center;
    @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: unset;
        text-align: left;
        margin-top: 2%;
    }
`;

export const ProjectTextSpan = styled.span`
    margin: 0 12px 0 0;
`;

export const ContentLink = styled.a`
    text-decoration-line: none;
    &:visited {
        color: rgb(202, 202, 203);
    }
    &:hover {
        cursor: pointer;
        color: rgb(29, 183, 34);
    }
    &:active {
        color: rgb(202, 202, 203);
    }
    margin: 0 2% 0 2%;
    min-width: 370px;
`;

export const ProjectNameBox = styled.div`
    color: rgb(124, 150, 254);
    @media screen and (max-width: 768px) {
        white-space: nowrap;
    }
`;

export const CareerBox = styled.div`
    display: flex;
    align-items: center;
    @media screen and (max-width: 768px) {
    }
`;

export const CompanyImageBox = styled.div`
    margin-right: 12px;
    @media screen and (max-width: 768px) {
        margin-right: 10px;
    }
`;

export const CompanyImage = styled.img`
    width: 22px;
    height: 22px;
    border-radius: 50%;
`;

export const ConsoleBasic = styled.span`
    margin-right: 0.3%;
`;

export const ConsoleInputStyled = styled.input`
    width: 100%;
    background-color: transparent;
    border: none;
    color: rgb(202, 202, 203);
    outline: none;
    font-size: 16px;
    font-family: 'consola';
    @media screen and (max-width: 768px) {
        font-size: ${({ theme }) => theme.fonts.mobile.smallFontSize};
    }
`;

export const ErrorText = styled.p`
    margin: 0px 0px 24px 0px;
`;

export const CompanyDay = styled.div`
    margin: 0 12px 0 0;
    min-width: 210px;
    @media screen and (max-width: 768px) {
        min-width: 130px;
    }
`;

export const ProjectDay = styled.div`
    margin: 0 12px 0 0;
    min-width: 140px;
    @media screen and (max-width: 768px) {
        min-width: 100px;
    }
`;

export const CompanyBox = styled.div`
    display: flex;
    min-width: 180px;
    @media screen and (max-width: 768px) {
        min-width: 140px;
        align-items: center;
    }
`;

export const ProjectSemiDetailWrapper = styled.div`
    width: 100%;
    display: flex;
    margin: 12px 0 24px 0;
    @media screen and (max-width: 768px) {
        flex-wrap: wrap;
    }
`;

export const ImgBox = styled.div`
    width: 50%;
    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;

export const Photo = styled.img`
    width: 100%;
    height: auto;
`;

export const StackContainer = styled.div`
    flex-wrap: wrap;
    display: flex;
    margin-top: 12px;
`;

export const CategoryBox = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    padding: 1%;
    min-width: 13%;
    @media screen and (max-width: 768px) {
        min-width: 36%;
    }
`;

export const CategoryNameBox = styled.div`
    width: 100%;
    margin-bottom: 12px;
    align-items: center;
    text-align: center;
    border-style: dashed;
    border-width: 1px;
`;

export const StackBox = styled.div`
    width: 100%;
    margin-bottom: 5%;
    display: flex;
    align-items: center;
    justify-content: left;
    border-right-style: dashed;
    border-left-style: dashed;
    border-width: 1px;
`;

export const StackImg = styled.img`
    margin: 0 8px 0 16px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    @media screen and (max-width: 768px) {
        width: 20px;
        height: 20px;
    }
`;

export const StackListSpan = styled.span`
    text-align: center;
`;

export const GapDiv = styled.div`
    display: flex;
    width: 24px;
    height: 24px;
`;

export const AboutContainer = styled.div`
    width: 50%;
    padding-left: 2%;
    @media screen and (max-width: 768px) {
        width: 100%;
        margin-top: 32px;
    }
`;

export const DetailHeaderBox = styled.div`
    display: inline-block;
    margin-top: 0px;
    color: ${({ theme }) => theme.colors.yellow};
    span {
        border-bottom: 1px dashed rgb(244, 245, 246);
        padding-bottom: 24px;
    }
`;

export const DetailContentBox = styled.div`
    border-width: 1px;
    margin-top: 48px;
    margin-bottom: 3%;
`;

export const ProjectTextBox = styled.div`
    display: flex;
`;
