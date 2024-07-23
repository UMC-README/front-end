import React, { useState } from 'react';
import styled from 'styled-components';
import Check from '../../../assets/images/post_type_check.svg';

export const TypeCheck = ({ onTypeChange }) => {
  const [selectedType, setSelectedType] = useState('quiz');

  const handleClick = (type) => {
    setSelectedType(type);
    onTypeChange(type);
  };

  return (
    <Container>
      <CheckImg src={Check} alt="check" />
      <Type
        isSelected={selectedType === 'quiz'}
        onClick={() => handleClick('quiz')}
      >
        퀴즈
      </Type>
      <Division>|</Division>
      <Type
        isSelected={selectedType === 'mission'}
        onClick={() => handleClick('mission')}
      >
        미션
      </Type>
    </Container>
  );
};

const Container = styled.div`
  padding: 0.375rem 0.625rem;
  display: flex;
  align-items: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 1rem */
  letter-spacing: -0.02rem;
`;

const CheckImg = styled.img`
  width: 1.125rem;
  height: 1.125rem;
`;

const Division = styled.span`
  color: var(--Primary-normal, var(--Primary-Normal, #509bf7));
  margin-left: 0.62rem;
  margin-right: 0.62rem;
`;

const Type = styled.span`
  cursor: pointer;
  color: ${(props) => (props.isSelected ? '#509BF7' : '#888888')};
`;

export default TypeCheck;
