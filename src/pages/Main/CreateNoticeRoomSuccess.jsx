import React from 'react';
import styled from 'styled-components';
import { CustomBtn } from '../../components/CustomBtn';
import { Header } from '../../components/Header';
import CreateNoticeRoomSuccessForm from '../../components/Main/CreateNoticeRoomSuccessForm';
import { useLocation, useNavigate } from 'react-router-dom';
import KakaoButton from '../../components/common/kakao-button';

const CreateNoticeRoomSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const profileImage = location.state?.roomImage || '';
  const url = location.state?.roomInviteUrl || '';
  const roomName = location.state?.roomName || '';
  const password = location.state?.roomPassword || '';
  const nickName = location.state?.adminNickname || '';
  const roomId = location.state?.roomId || '';

  const handleNoticeClick = () => {
    navigate(`/notice/${roomId}`);
  };

  const handleHomeClick = () => {
    navigate('/home');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header title={roomName} isSearch={false} url="/create-notice-room" />
        <CreateNoticeRoomSuccessForm
          profileImage={profileImage}
          url={url}
          roomName={roomName}
          password={password}
          nickName={nickName}
        />
      </div>
      <ButtonContainer>
        <KakaoButton
          full
          zeroMargin
          room={{
            name: roomName,
            password,
            image: profileImage[0],
            url,
          }}
        >
          카카오톡으로 공유하기
        </KakaoButton>
        <CustomBtn
          text="공지방으로 이동"
          background="#509BF7"
          border="none"
          onClick={handleNoticeClick}
        />
        <CustomBtn
          text="메인으로 이동"
          background="#FFFFFF"
          border="0.5px solid #509BF7"
          onClick={handleHomeClick}
        />
      </ButtonContainer>
    </div>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-bottom: 1.25rem;
  padding: 0.625rem 1rem;
`;

export default CreateNoticeRoomSuccess;
