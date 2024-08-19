import React from 'react';
import { useState } from 'react';
import { MemberListDetails } from './MemberListDetails';
import CustomModal from '../CustomModal';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { removeMember } from '../../redux/KeySlice';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusIcon } from '../../assets/svgs/icons';
import { Link } from 'react-router-dom';
import { getMemberBan } from '../../api/Member/memberListCheck';


export const MemberListMap = ({ members }) => {
  const {roomId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { members } = useSelector(state => state.keys);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  console.log('넘어오는 프롭스:', members); // 확인용(여기 지금 userId나옴)

  const handleOpenModal = (profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProfileLinkClick = () => {
    if (selectedProfile) {
      const userId = encodeURIComponent(selectedProfile.userId);
      navigate(`/notice/${roomId}/member/${userId}`, {
        state: {
          profile_image: selectedProfile.profile_image,
          nickname: selectedProfile.nickname,
          userId: selectedProfile.userId
        },
      });console.log("state로 덤길 셀렉티드 nickname",selectedProfile.nickname)
        console.log("state로 덤길 셀렉티드 nickname",selectedProfile.userId)
    } else {
      console.error('Selected profile is not defined');
    }
  };

  const handleKickOutClick = () => {
    setIsSecondModalOpen(true);
  };

  const handleSecondModalClose = () => {
    setIsSecondModalOpen(false);
  };

  const handleConfirmKickOut = async () => {
    if (selectedProfile) {
      try{
        const bannedMember = await getMemberBan(selectedProfile.nickname, roomId)
        console.log("추방당한 멤버",bannedMember)
      }catch(err){
        console.log("추방실패")
      };
      console.log('추방할 리스트:', selectedProfile.nickname);
      dispatch(removeMember(selectedProfile.nickname));
      setIsSecondModalOpen(false);
      setIsModalOpen(false);
      setIsThirdModalOpen(true);
    }
  };

  const handleThirdModalClose = () => {
    setIsThirdModalOpen(false);
  };

  const modalButtons = [
    { label: '프로필', onClick: handleProfileLinkClick, color: 'black' },
    { label: '추방하기', onClick: handleKickOutClick, color: 'red' },
  ];

  console.log('필터링된 멤버:', members);

  return (
    <div>
      {members && members.length > 0 ? (
        members.map((item, index) =>
          item && item.nickname ? (
            <div key={index}>
              <MemberListDetails
                nickname={item.nickname}
                profile_image={item.profile_image}
                onOpenModal={() => handleOpenModal(item)}
              />
              {selectedProfile?.nickname === item.nickname && (
                <ShowMoreIconContainer>
                  <CustomModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    buttons={modalButtons}
                  />
                </ShowMoreIconContainer>
              )}
            </div>
          ) : (
            <p key={index}>유효하지 않은 멤버 데이터</p>
          ),
        )
      ) : (
        <p>멤버가 없습니다.</p>
      )}

      <ButtonContainer>
        <Link to={`/notice/${roomId}/invite`}>
          <MemberAddBtn>
            <PlusIcon />
          </MemberAddBtn>
        </Link>
        <ButtonText>멤버초대하기</ButtonText>
      </ButtonContainer>

      {isSecondModalOpen && (
        <ModalOverlay onClick={handleSecondModalClose}>
          <SecondModalContent onClick={(e) => e.stopPropagation()}>
            <TextContainer>
          <ModalText>
          추방하시겠습니까? <InfoText><br />추방한 유저는 다시 초대가능합니다.</InfoText>
          </ModalText>
          </TextContainer>
            <ButtonWrapper>
              <CloseButton onClick={handleSecondModalClose}>취소</CloseButton>
              <CheckButton onClick={handleConfirmKickOut}>확인</CheckButton>
            </ButtonWrapper>
          </SecondModalContent>
        </ModalOverlay>
      )}

      {isThirdModalOpen && (
        <ModalOverlay onClick={handleThirdModalClose}>
          <ThirdModalContent onClick={(e) => e.stopPropagation()}>
            <p>{selectedProfile?.nickname}님이 추방되었습니다.</p>
            <ButtonWrapper>
              <CloseButton onClick={handleThirdModalClose}>확인</CloseButton>
            </ButtonWrapper>
          </ThirdModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};



const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const ShowMoreIconContainer = styled.div`
  position: relative;
  z-index: 9999;
`;

const SecondModalContent = styled.div`
  display: flex;
  width: 16.875rem;
  padding-top: 1.1875rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.125rem;
  border-radius: 0.5rem;
  border: 0.0206rem solid var(--Primary-light-active, #c9e0fd);
  background: var(--Primary-light, #f4f9ff);
  backdrop-filter: blur(40px);
  z-index: 10001;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
//  border-top: 0.0206rem solid var(--Grayscale-Gray5, #888);
`;

const CloseButton = styled.button`
  display: flex;
  flex: 1;
  padding: 0.875rem 0;
  justify-content: center;
  align-items: center;
  border: none;
  background: transparent;
  color: #509bf7;
  border-top: 0.0206rem solid var(--Primary-light-active, #888888);
  border-right: 0.0206rem solid var(--Primary-light-active, #888888);
 
  border-left: none; /* 왼쪽 테두리를 제거 */
`;

const CheckButton = styled.button`
  display: flex;
  flex: 1;
  padding: 0.875rem 0;
  justify-content: center;
  align-items: center;
  border: none;
  background: transparent;
  color: #509bf7;
  border-top: 0.0206rem solid var(--Primary-light-active, #888888);
  border-left: none; 
`

const ButtonContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  white-space: nowrap;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
`;

const ButtonText = styled.span`
  width: 5.3125rem;
  height: 1.1875rem;
  gap: 0;
  opacity: 1;
  box-sizing: border-box;
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.2rem;
  letter-spacing: -0.02em;
  text-align: start;
`;

const MemberAddBtn = styled.button`
  width: 2.75rem;
  height: 2.75rem;
  margin-right: 0.8rem; //이거 어떻게 할지 정하기
  padding: 0.625rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
  background: #f4f9ff;
  border: 0.02rem solid #c9e0fd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ThirdModalContent = styled(SecondModalContent)`
  /* 색상 및 크기가 SecondModalContent와 동일하도록 유지 */
`;

const TextContainer = styled.div`
  padding: 0px, 16px, 15px, 16px;
`

const ModalText = styled.div`
  text-align: center;
  margin-bottom: 16px;
`

const InfoText = styled.span`

font-family: Pretendard;
font-size: 12px;
font-weight: 400;
line-height: 12px;
letter-spacing: -0.02em;
text-align: center;

`