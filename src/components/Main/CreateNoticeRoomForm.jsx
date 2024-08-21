import React, { useState } from 'react';
import styled from 'styled-components';
import CustomInput from '../../components/CustomInput';
import toAlbumBtnIcon from '../../assets/svgs/albumbutton.svg';
import { postNoticeRoomImage } from '../../api/Main/createnoticeroom';
import { ReactComponent as Tooltip } from '../../assets/svgs/help_icon.svg';
import useOutsideClick from '../../hooks/use-outside-click';

const CreateNoticeRoomForm = ({
  leaderName,
  roomName,
  password,
  penaltyCount,
  image,
  onLeaderNameChange,
  onRoomNameChange,
  onPasswordChange,
  onPenaltyCountChange,
  onImageChange,
}) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipRef] = useOutsideClick(() => setIsTooltipOpen(false));

  const handleOpenTooltip = (e) => {
    e.stopPropagation();
    setIsTooltipOpen((prev) => !prev);
  };

  const handleAlbumClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (event) => {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await postNoticeRoomImage(file);
        console.log('서버 응답: ', response);
        const imageUrl = response.result.images;
        if (imageUrl) {
          onImageChange(imageUrl);
        } else {
          console.error('이미지 URL이 응답에 포함되어 있지 않음');
        }
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      }
    };
    input.click();
  };

  return (
    <Container>
      <ImageContainer>
        <RoomImage src={image} alt="Room" />
        <ToAlbumBtn onClick={handleAlbumClick}>
          <img src={toAlbumBtnIcon} alt="Album Button" />
        </ToAlbumBtn>
      </ImageContainer>
      <FormContainer>
        <Section>
          <SectionTitle>
            단체 정보
            <button className="tooltip" onClick={handleOpenTooltip}>
              <Tooltip />
              {isTooltipOpen && (
                <div className="tooltip-wrap" ref={tooltipRef}>
                  <div className="content regular-10">
                    페널티 개수는 <br />
                    최대 10개까지 설정 가능합니다.
                    <br />
                    설정한 개수 이상으로 페널티를 받으면,
                    <br />
                    해당 팀원은
                    <b>퇴장</b> 처리됩니다.
                  </div>
                  <div className="tip" />
                </div>
              )}
            </button>
          </SectionTitle>
          <CustomInput
            placeholder="단체 대표자 이름"
            value={leaderName}
            onChange={onLeaderNameChange}
          />
        </Section>
        <Section>
          <SectionTitle>공지방 설정</SectionTitle>
          <CustomInput
            placeholder="공지방 이름"
            value={roomName}
            onChange={onRoomNameChange}
          />
          <CustomInput
            placeholder="비밀번호"
            value={password}
            onChange={onPasswordChange}
          />
          <CustomInput
            placeholder="패널티 개수"
            value={penaltyCount}
            onChange={onPenaltyCountChange}
          />
        </Section>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.625rem 1rem;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 2rem;
  object-fit: cover;
`;

const RoomImage = styled.div`
  width: 8.75rem;
  height: 8.75rem;
  border-radius: 1.125rem;
  background: ${({ src }) =>
    src ? `url(${src}) lightgray 50% / cover no-repeat` : 'lightgray'};
  background-color: ${({ src }) => (src ? 'transparent' : 'lightgray')};
  flex-shrink: 0;
`;

const ToAlbumBtn = styled.button`
  position: absolute;
  right: 8rem;
  bottom: 0rem;
  background: none;
  border: none;
  cursor: pointer;
`;

const FormContainer = styled.div`
  display: flex;
  width: 24.875rem;
  flex-direction: column;
  gap: 1.875rem;
  margin-bottom: 4rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

const SectionTitle = styled.div`
  display: flex;
  color: var(--Text-default, var(--Grayscale-Gray7, #222));
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.0225rem;
  gap: 0.5rem;

  .tooltip {
    border: none;
    background-color: #ffffff;
    padding: 0;
    display: flex;
    position: relative;

    .tooltip-wrap {
      position: absolute;
      bottom: 1.5rem;
      text-align: start;
      width: max-content;

      .content {
        border-radius: 0.5rem;
        padding: 0.625rem;
        background-color: var(--color-gray-1);
        position: relative;
        right: 1.6rem;
        color: var(--color-default);
      }

      .tip {
        width: 0;
        height: 0;
        border-width: 0.625rem 0.625rem 0;
        border-style: solid;
        border-color: #ffffff;
        border-top: 0.625rem solid var(--color-gray-1);
        position: relative;
      }
    }
  }
`;

export default CreateNoticeRoomForm;
