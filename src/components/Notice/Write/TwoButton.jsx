import React from 'react';
import styled from 'styled-components';
import { CustomBtn } from '../../CustomBtn';

export const TwoButton = ({ isButtonEnabled, btn1, btn2 }) => {
  return (
    <Container>
      <ButtonWrapper>
        <CustomBtn
          props={{
            text: btn1,
            border: '0.5px solid var(--Primary-normal, #509BF7)',
            background: '#FFFFFF',
            link: `/notice/write`,
          }}
        />
      </ButtonWrapper>
      <ButtonWrapper>
        <CustomBtn
          props={{
            text: btn2,
            border: 'none',
            background: isButtonEnabled ? '#509BF7' : '#BDBDBD',
            link: btn2 === '확인' ? `/notice/write/preview` : `/notice`,
          }}
        />
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 0.625rem;
`;

const ButtonWrapper = styled.div`
  flex: 1;
  display: flex;
`;

const CustomBtnStyled = styled(CustomBtn)`
  width: 100%;
`;
