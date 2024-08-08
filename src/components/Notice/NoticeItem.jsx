import React from 'react';
import { NoticeTitle } from './NoticeTitle';
import styled from 'styled-components';
import NoticeCheck from '../../assets/images/notice_check.svg';

export const NoticeItem = ({ props, imgs, preview }) => {
  console.log(props);
  return (
    <Container>
      <NoticeTitle props={props} preview={preview} />
      <NoticeContent>{props.postBody}</NoticeContent>
      {props.postImage !== null ? <Thumbnail src={imgs[0]} /> : <></>}
      {preview ? (
        <></>
      ) : (
        <NoticeCheckButton>
          <NoticeCheckIcon src={NoticeCheck} /> 공지 확인
        </NoticeCheckButton>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  border-radius: 0.5rem;
  border: 0.33px solid var(--Primary-Light-active, #c9e0fd);
  background: var(--Primary-Light, #f4f9ff);
`;

const NoticeContent = styled.div`
  align-self: stretch;
  color: var(--Text-caption, var(--Grayscale-Gray5, #888));
  font-size: 1rem;
  font-weight: 500;
  line-height: 120%; /* 1.2rem */
  letter-spacing: -0.02rem;
`;

const Thumbnail = styled.img`
  height: 12.5rem;
  align-self: stretch;
`;

const NoticeCheckButton = styled.div`
  display: flex;
  width: 6.1875rem;
  height: 1.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  border-radius: 0.5rem;
  background: var(--Primary-Normal, #509bf7);
  color: var(--Basic-White, var(--Basic-White, #fff));
  font-size: 1rem;
  font-weight: 400;
  line-height: 100%; /* 1rem */
  letter-spacing: -0.02rem;
  margin-left: auto;
`;

const NoticeCheckIcon = styled.img`
  width: 0.75rem;
  height: 0.75rem;
`;
