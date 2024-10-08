import React from 'react';
import styled from 'styled-components';

const PenaltyNoticeForm = ({
  type,
  submitState,
  title,
  startDate,
  endDate,
  content,
  image,
}) => {
  const displayType = type === 'MISSION' ? '미션' : '퀴즈';
  const displayState =
    submitState === 'NOT_COMPLETE'
      ? '미제출'
      : submitState === 'REJECT'
        ? '거절'
        : '검토 중';

  return (
    <Container>
      <StatusContainer>
        <Type type={type}>{displayType}</Type>
        <State state={submitState}>{displayState}</State>
      </StatusContainer>
      <NoticeTitle>{title}</NoticeTitle>
      <DueDate>
        {startDate} - {endDate}
      </DueDate>
      <NoticeContent>
        <Content>{content}</Content>
        <NoticeImage src={image || ''} alt="공지 이미지" />
      </NoticeContent>
    </Container>
  );
};

export default PenaltyNoticeForm;

const Container = styled.div`
  display: flex;
  padding: 0.625rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 0.5rem;
  border: 0.33px solid #c9e0fd;
  background: #f4f9ff;
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`;

const Type = styled.div`
  display: flex;
  padding: 0.375rem 0.625rem;
  justify-content: center;
  align-items: center;
  border-radius: 62.4375rem;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.0175rem;
  width: 2.5rem;
  white-space: nowrap;
  background: ${({ type }) => (type === 'MISSION' ? '#509BF7' : '#FFF')};
  border: ${({ type }) => (type === 'QUIZ' ? '2px solid #509BF7' : 'none')};
  color: ${({ type }) => (type === 'MISSION' ? 'white' : '#509BF7')};
`;

const State = styled.div`
  display: flex;
  padding: 0.375rem 0.625rem;
  justify-content: center;
  align-items: center;
  border-radius: 62.4375rem;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.0175rem;
  width: 2.5rem;
  white-space: nowrap;
  background: ${({ state }) =>
    state === 'NOT_COMPLETE'
      ? '#E9E9E9'
      : state === 'PENDING'
        ? '#E9E9E9'
        : state === 'REJECT'
          ? '#FDD8DB'
          : 'transparent'};
  color: ${({ state }) =>
    state === 'NOT_COMPLETE'
      ? '#888'
      : state === 'PENDING'
        ? '#222'
        : state === 'REJECT'
          ? '#F5535E'
          : '#000'};
`;

const NoticeTitle = styled.div`
  align-self: stretch;
  color: var(--Text-default, var(--Grayscale-Gray7, #222));
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 100%; /* 1.125rem */
  letter-spacing: -0.0225rem;
`;

const DueDate = styled.div`
  display: flex;
  padding-bottom: 0.5rem;
  align-items: center;
  gap: 0.25rem;
  align-self: stretch;
  border-bottom: 0.33px solid var(--Primary-Normal, #509bf7);
  overflow: hidden;
  color: var(--Primary-normal, var(--Primary-Normal, #509bf7));
  text-overflow: ellipsis;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 100%; /* 0.75rem */
  letter-spacing: -0.015rem;
`;

const NoticeContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
  width: 100%;
  box-sizing: border-box;
`;

const Content = styled.div`
  flex: 1;
  height: 3.75rem;
  overflow: hidden;
  color: #888;
  font-size: 1rem;
  font-weight: 500;
  line-height: 120%;
  letter-spacing: -0.02rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;
`;

const NoticeImage = styled.img`
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 0.5rem;
  background: #888;
`;
