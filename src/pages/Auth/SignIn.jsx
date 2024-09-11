import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/Auth/user.js';
import logo from '../../assets/svgs/logoex.svg';
import KakaoButton from '../../components/common/kakao-button';
import Input from '../../components/common/input/index.jsx';
import FlexBox from '../../components/common/flex-box/index.jsx';

const SignIn = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(user);
      const token = response.data.result.accessToken;

      localStorage.setItem('token', token);

      window.location.replace('/home');
    } catch (error) {
      alert('이메일/비밀번호를 확인해주세요.');
    }
  };

  const handleChange = (e) => {
    const { value, id } = e.target;
    setUser({ ...user, [id]: value });
  };

  useEffect(() => {
    document.body.style.marginTop = '0';

    return () => {
      document.body.style.marginTop = '2.75rem';
    };
  }, []);

  return (
    <Root>
      <StyledLogo src={logo} alt="logo" />
      <InputContainer onSubmit={handleLogin}>
        <FlexBox col gap={0.75}>
          <Input
            id="email"
            type="text"
            placeholder="이메일"
            value={user.email}
            onChange={handleChange}
          />
          <Input
            id="password"
            type="password"
            placeholder="비밀번호"
            value={user.password}
            maxLength={20}
            onChange={handleChange}
          />
        </FlexBox>
        <ButtonWrapper>
          <SignInButton onClick={handleLogin}>로그인</SignInButton>
          <KakaoButton full isLogin>
            카카오톡으로 계속하기
          </KakaoButton>
          <NotAuth>아직 회원이 아니신가요?</NotAuth>
          <SignupButton onClick={() => navigate('/sign-up')}>
            회원가입
          </SignupButton>
        </ButtonWrapper>
      </InputContainer>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  height: 100%;
`;

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  justify-content: space-between;
  height: 100%;
`;

const CommonButton = styled.button`
  padding: 1rem 0;
  border-radius: 0.5rem;
  border: none;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  width: 100%;
`;

const SignInButton = styled(CommonButton)`
  background-color: #509bf7;
  color: #ffffff;
`;

const SignupButton = styled(CommonButton)`
  background-color: #ffffff;
  color: #509bf7;
  border: 0.5px solid #509bf7;
`;

const NotAuth = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
  width: max-content;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 429px;
  display: flex;
  flex-direction: column;
  padding-bottom: 3.37rem;
`;

const StyledLogo = styled.img`
  width: 21.5625rem;
  height: 6.875rem;
  margin: 2.88rem auto 3.25rem auto;
`;

export default SignIn;
