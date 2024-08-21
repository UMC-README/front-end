import React from 'react';
import { KakaoLogin } from './style';
import { ReactComponent as KakaoLogo } from '../../../assets/svgs/kakao_logo.svg';

const KakaoButton = ({ children, room, full, zeroMargin, isLogin }) => {
  const apiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const kakaoLoginPage = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${apiKey}&redirect_uri=${redirectUri}&response_type=code`;
  const prodBaseUrl = import.meta.env.VITE_PROD_BASE_URL;

  const handleKakaoLogin = (e) => {
    e.preventDefault();
    window.location.href = kakaoLoginPage;
  };

  const handleShareUrl = () => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: 'READ.ME',
        description: `${room.name} 공지방에 참여하세요!\n비밀번호는 ${room.password} 입니다.`,
        imageUrl: room.image || '',
        link: {
          mobileWebUrl: `${prodBaseUrl}/notice/entry/${room.url}`,
          webUrl: `${prodBaseUrl}/notice/entry/${room.url}`,
        },
      },
    });
  };
  return (
    <KakaoLogin
      className={`medium-16 ${full && 'full'} ${zeroMargin && 'zero-margin'}`}
      onClick={(e) => (isLogin ? handleKakaoLogin(e) : handleShareUrl())}
    >
      <KakaoLogo /> {children}
    </KakaoLogin>
  );
};

export default KakaoButton;
