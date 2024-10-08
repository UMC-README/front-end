import React from 'react';
import { KakaoLogin } from './style';
import { ReactComponent as KakaoLogo } from '../../../assets/svgs/kakao_logo.svg';

const KakaoLoginButton = ({ children, onClick, full }) => {
  return (
    <KakaoLogin className={`medium-16 ${full && 'full'}`} onClick={onClick}>
      <KakaoLogo /> {children}
    </KakaoLogin>
  );
};

export default KakaoLoginButton;
