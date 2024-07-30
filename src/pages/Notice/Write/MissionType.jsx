import React from 'react';
import { Header } from '../../../components/Header';
import styled from 'styled-components';
import ImgUpload from '../../../components/Notice/Write/ImgUpload';

const MissionType = () => {
  return (
    <div>
      <Header props={{ title: '공지 작성', isSearch: false }} />
      <Container>
        <ImgUpload />
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  padding: 0.625rem 1rem;
  flex-direction: column;
  gap: 1rem;
`;

export default MissionType;
