import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import CreateNoticeRoomForm from '../../components/Main/CreateNoticeRoomForm';
import { CustomBtn } from '../../components/CustomBtn';
import styled from 'styled-components';
import { postNoticeRoom } from '../../api/Main/createnoticeroom';

export const CreateNoticeRoom = () => {
  const [leaderName, setLeaderName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');
  const [penaltyCount, setPenaltyCount] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleCreateClick = async () => {
    if (isFormValid) {
      const RoomData = {
        room_image: image,
        admin_nickname: leaderName,
        room_name: roomName,
        room_password: password,
        max_penalty: penaltyCount,
      };

      try {
        const response = await postNoticeRoom(RoomData);
        navigate('/create-notice-room/success', { state: response.result });
      } catch (error) {
        console.log('공지방 생성 중 에러', error);
      }
    }
  };

  const isFormValid =
    image && leaderName && roomName && password && penaltyCount;

  const handlePenaltyCountChange = (e) => {
    const value = e.target.value;
    if (value <= 10) {
      setPenaltyCount(value);
    } else {
      alert('페널티 개수는 최대 10개까지 설정 가능합니다.');
    }
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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Header title="공지방 생성" isSearch={false} url="/home" />
        <CreateNoticeRoomForm
          leaderName={leaderName}
          roomName={roomName}
          password={password}
          penaltyCount={penaltyCount}
          image={image}
          onImageChange={(img) => setImage(img || null)}
          onLeaderNameChange={(e) => setLeaderName(e.target.value)}
          onRoomNameChange={(e) => setRoomName(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onPenaltyCountChange={handlePenaltyCountChange} // 변경된 부분
        />
      </div>
      <ButtonContainer>
        <CustomBtn
          text="생성하기"
          background={isFormValid ? '#509BF7' : '#BDBDBD'}
          border="none"
          onClick={handleCreateClick}
        />
      </ButtonContainer>
    </div>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  margin-bottom: 1.25rem;
  padding: 0rem 1rem;
`;

export default CreateNoticeRoom;
