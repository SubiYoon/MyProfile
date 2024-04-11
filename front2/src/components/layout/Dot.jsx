import styled from 'styled-components';
import React from 'react';

const Dot = ({ currentpage }) => {
  return (
    <DotContainer>
      <DotBox>
        <Dots currentpage={currentpage} num={1} />
        <Dots currentpage={currentpage} num={2} />
        <Dots currentpage={currentpage} num={3} />
      </DotBox>
    </DotContainer>
  );
};

export default Dot;

const DotContainer = styled.div`
  position: fixed;
  top: 45%;
  right: 24px;
`;

const DotBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 20px;
  height: 100px;
`;

const Dots = styled.div`
  width: 10px;
  height: 10px;
  border: 4px solid black;
  border-radius: 999px;
  background-color: ${({ currentpage, num }) =>
    currentpage === num ? 'black' : 'transparent'};
  transition-duration: 1000px;
  transition: background-color 0.5s;
`;
