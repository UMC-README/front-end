import React from 'react';
import styled from 'styled-components';

const NoticeRoom = ({ index }) => {
  return (
    <Container>
      <TopSection>
        <Time>몇분 전</Time>
      </TopSection>
      <BottomSection>
        <ProfileImage
          src="../../assets/images/defaultprofileimage.png"
          alt="profile"
        />
        <RoomName>공지방 이름</RoomName>
        <UserName>공지방 닉네임</UserName>
      </BottomSection>
    </Container>
  );
};

const Container = styled.div`
  width: calc((100% - 1.625rem) / 3);
  height: 10rem;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  border: 0.0208rem solid var(--Primary-normal, #509bf7);
`;

const TopSection = styled.div`
  display: flex;
  padding: 0.3125rem 0.4375rem;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
  border: 0.0625rem solid #509bf7;
  background: #509bf7;
`;

const Time = styled.div`
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 0.75rem;
  letter-spacing: -0.015rem;
`;

const BottomSection = styled.div`
  display: flex;
  height: 8.625rem;
  padding: 1rem 0.5rem;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  gap: 0.375rem;
`;

const ProfileImage = styled.img`
  display: flex;
  width: 2.75rem;
  height: 2.75rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.75rem;
  font-size: 0.625rem;
  font-family: Pretendard;
`;

const RoomName = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--Primary-dark, var(--Primary-Dark, #3c74b9));
  text-align: center;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 0.875rem;
  letter-spacing: -0.0175rem;
  max-height: 1.75rem;
`;

const UserName = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--Text-caption, var(--Grayscale-Gray5, #888));
  text-align: center;
  font-family: Pretendard;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 400;
  line-height: 0.625rem;
  letter-spacing: -0.0125rem;
  max-height: 1.25rem;
`;

export default NoticeRoom;
