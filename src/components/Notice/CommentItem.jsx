import React, { useState } from 'react';
import styled from 'styled-components';
// import ShowmoreIcon from '../../assets/svgs/show_more_icon.svg';
import { ReactComponent as ShowmoreIcon } from '../../assets/svgs/show_more_icon.svg';
import CustomModal from '../CustomModal';

export const CommentItem = ({ props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalClose = () => {
    setIsOpen(false);
  };
  const deleteComment = () => {
    console.log('삭제');
  };
  const modalProps = {
    isOpen: isOpen,
    onClose: modalClose,
    buttons: [
      {
        label: '삭제',
        onClick: deleteComment,
        color: '#F5535E',
      },
    ],
  };

  return (
    <Container>
      <Profile src={props.commentAuthorProfileImage} alt="profile" />
      <Comment>
        <Nickname>{props.commentAuthorNickname}</Nickname>
        <Content>{props.commentBody}</Content>
        <Date>{props.createdAt}</Date>
      </Comment>
      {props.isCommentMine && (
        <ShowmoreIconContainer>
          <ShowmoreButton onClick={() => setIsOpen((prev) => !prev)}>
            <StyledShowmoreIcon />
          </ShowmoreButton>

          <CustomModal {...modalProps} />
        </ShowmoreIconContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 0.5rem 0.375rem;
  align-items: flex-start;
  gap: 0.25rem;
  align-self: stretch;
`;

const Profile = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.125rem;
  background: #d9d9d9;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  flex: 1 0 0;
`;

const Nickname = styled.div`
  display: flex;
  height: 1.25rem;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  color: var(--Text-default, var(--Grayscale-Gray7, #222));
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 100%; /* 0.875rem */
  letter-spacing: -0.0175rem;
`;

const Content = styled.div`
  align-self: stretch;
  color: var(--Text-default, var(--Grayscale-Gray7, #222));
  font-size: 1rem;
  font-weight: 400;
  line-height: 100%; /* 1rem */
  letter-spacing: -0.02rem;
`;

const Date = styled.div`
  align-self: stretch;
  color: var(--Text-caption, var(--Grayscale-Gray5, #888));
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 100%; /* 0.75rem */
  letter-spacing: -0.015rem;
`;

const More = styled.img`
  display: flex;
  width: 0.875rem;
  height: 0.875rem;
  justify-content: center;
  align-items: center;
`;

const ShowmoreIconContainer = styled.div`
  position: relative;
`;

const ShowmoreButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
`;

const StyledShowmoreIcon = styled(ShowmoreIcon)`
  width: 1.5rem;
  height: 1.5rem;
`;
