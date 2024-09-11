import FlexBox from '../../../common/flex-box';
import { useEffect } from 'react';
import logo from '../../../../assets/svgs/logoex.svg';
import { Logo, WelcomeText } from './style';
import styled from 'styled-components';

export default function CompleteStep({ nickname }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.replace('/home');
      clearTimeout(timer);
    }, 2000);
  }, []);
  return (
    <Container>
      <FlexBox col items="center" py={13.6} gap={2}>
        <Logo src={logo} alt="로고" />
        <WelcomeText className="bold-36">
          {nickname} 님,
          <br />
          환영합니다!
        </WelcomeText>
      </FlexBox>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  background-color: white;
  width: 100%;
`;
