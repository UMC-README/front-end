import React, { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { SlideButton, CheckButton, XButton } from '../../../assets/svgs/icons';
import { useDispatch } from 'react-redux';
import { acceptance, rejection } from '../../../redux/CheckSlice';
import { useSelector } from 'react-redux';

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1 0 0;
  align-self: stretch;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProfileName = styled.span`
  align-self: stretch;
  color: var(--Text-default, var(--Grayscale-Gray7, #222));
  font-size: 1rem;
  font-weight: 500;
  line-height: 120%; /* 1.2rem */
  letter-spacing: -0.02rem;
`;

const ProfileInfo = styled.span`
  align-self: stretch;
  color: var(--Text-caption, var(--Grayscale-Gray5, #888));

  font-size: 0.75rem;
  font-weight: 400;
  line-height: 100%; /* 0.75rem */
  letter-spacing: -0.015rem;
`;

const ImgContainer = styled.img`
  display: flex;
  width: 2.25rem;
  height: 2.25rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.75rem;
`;

const ContentContainer = styled.div`
  align-self: stretch;
  height: 12.5rem;
  justify-content: flex-end; //슬라이드버튼을 오른쪽 끝에 오게 만든다.
  align-items: center;
  display: flex;
`;
const SecondButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 0.5rem;
  border: 0.33px solid var(--Primary-Light-active, #c9e0fd);
`;

const YesButton = styled.button`
  display: flex;
  padding: 0.5rem;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  border-right: 0.33px solid var(--Primary-light-active, #c9e0fd);
  background: var(--Primary-light, #f4f9ff);
  border: 0.3px solid #c9e0fd;
  border-radius: 0.5rem 0rem 0rem 0.5rem;
`;

const NoButton = styled.button`
  display: flex;
  padding: 0.5rem;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  border-right: 0.33px solid var(--Primary-light-active, #c9e0fd);
  background: var(--Primary-light, #f4f9ff);
  border: 0.3px solid #c9e0fd;
  border-radius: 0rem 0.5rem 0.5rem 0rem;
`;

export const AcceptanceListMap = ({
  submit_id,
  user_info,
  content,
  image_URL,
}) => {
  console.log('AcceptanceListMap rendered');
  const { nickname, profile_image } = user_info;
  const dispatch = useDispatch();
  const requiredList = useSelector((state) => state.check.requiredList);

  const handleAcceptance = () => {
    console.log('수락한 게시글 id', submit_id);
    dispatch(acceptance(submit_id));
  };

  const handleRejection = () => {
    console.log('거절할 게시글', submit_id);
    dispatch(rejection(submit_id));
  };

  useEffect(() => {
    console.log('리렌더링:', requiredList);
  }, [requiredList]);

  return (
    <Container>
      <ProfileContainer>
        <ImgContainer src={profile_image} alt="Profile" />
        <TextContainer>
          <ProfileName>{nickname}</ProfileName>
          <ProfileInfo>{content}</ProfileInfo>
        </TextContainer>
      </ProfileContainer>
      <ContentContainer>
        <SlideButton />
      </ContentContainer>
    </Container>
  );
};
