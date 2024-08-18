import React, { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { SlideButton, CheckButton, XButton } from '../../../assets/svgs/icons';
import { useDispatch } from 'react-redux';
import { acceptance, rejection } from '../../../redux/CheckSlice';
import { useSelector } from 'react-redux';
import { getSubmitRequest } from '../../../api/Member/memberListCheck';



export const CheckListMap = ({nickname, profile_image, URL, submit_state, onKeysCountChange }) => {
 
  const dispatch = useDispatch();
  const requiredList = useSelector((state) => state.check.requiredList);
  const keysCount = useSelector((state) => state.check.count);
 
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const pageLimit = 1;

  console.log("키어카운트:",keysCount)

  const roomId = 8;

  useEffect(() => {
    setTotalPage(URL);
  }, [URL]);


  useEffect(() => {
    // URL이 배열인지 확인하고, totalPage를 설정
    if (Array.isArray(URL)) {
      setTotalPage(URL.length);
    } else {
      setTotalPage(1); // URL이 배열이 아닌 경우 기본값 설정
    }
  }, [URL]);

  const lastPage = () => setPage(totalPage);
  const prevPage = () => setPage(page > 1 ? page - 1 : page);
  const nextPage = () => setPage(page < totalPage ? page + 1 : page);

  // URL이 배열인지 확인하고, 페이지에 해당하는 이미지를 설정
  const currentImage = (Array.isArray(URL) && URL.length > 0) 
    ? URL[page - 1] 
    : '/src/assets/pngs/defaultprofileimage.png';

    const handleAcceptance = async () => {
      try {
        console.log('수락한 게시글 id', nickname);
        const acceptedMember = await getSubmitRequest("accept", roomId);
        dispatch(acceptance(nickname));
        console.log("수락된 멤버",acceptedMember)
      } catch (error) {
        console.error('Error handling acceptance:', error);
      }
    };

  const handleRejection = async () => {
    try{
      console.log('거절할 게시글', nickname);
      const deniedMember = await getSubmitRequest("reject", roomId);
      console.log("거절된 멤버",deniedMember)
      dispatch(rejection(nickname));

    }catch (error) {
      console.error('Error handling acceptance:', error);
    }
 
  };

  const handlePagination = () => {
    currentPage = currentPage+1;
  }

  if (!requiredList.some((item) => item.nickname === nickname)) {
    return null; // 수락 또는 거절된 항목은 렌더링하지 않음
  }


  return (
 
      <TotalContainer>
        <BorderContainer>
        <ProfileContainer>
          {profile_image===null?(
            <>
            <ImgContainer  src='/src/assets/pngs/defaultprofileimage.png'/>
            </>
          ):(
            <>
            <ImgContainer src={profile_image} alt="Profile" />
            </>
          )}
    
        <TextContainer>
          <ProfileName>{nickname}</ProfileName>
          <ProfileInfo>{/*content*/}ㅎㅇ</ProfileInfo>
        </TextContainer>
      </ProfileContainer>
      <ContentContainer>
      <StyledImage src={currentImage} alt="Content" />
        <NextPageBtn onClick={nextPage}>
          <SlideButton />
        </NextPageBtn>
      </ContentContainer>
      <SecondButtonContainer>
        <YesButton onClick={handleAcceptance}>
          <CheckButton />
          수락
        </YesButton>
        <NoButton onClick={handleRejection}>
          <XButton />
          거절
        </NoButton>
      </SecondButtonContainer>
      </BorderContainer>
      </TotalContainer>
  );
};



const TotalContainer = styled.div`
  width: 100%;
  margin-bottom: 0.625rem;
`

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1 0 0;
  
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
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  letter-spacing: -0.02rem;
`;

const ProfileInfo = styled.span`
  align-self: stretch;
  color: var(--Text-caption, var(--Grayscale-Gray5, #888));
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 100%;
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
  width: 100%;
  box-sizing: border-box; 
  height: 12.5rem;
  justify-content: center; 
  align-items: center;
  display: flex;
  position: relative; 
  margin-bottom: 0.625rem;
  margin-top: 0.625rem;
`;

const NextPageBtn = styled.button`
  width: 2rem; 
  height: 2rem; 
  position: absolute; 
  top: 50%; 
  right: 0.625rem; 
  transform: translateY(-50%); 
  padding: 0;
  gap: 0;
  border-radius: 50%; 
  opacity: 0.8; 
  border: none;
  background-color: transparent;
  cursor: pointer;
  z-index: 10; 
`;



const SecondButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  align-self: stretch;
  border-radius: 0.5rem;
  border: 0.33px solid var(--Primary-Light-active, #c9e0fd);
  margin-bottom: 1rem;
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


const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  border: 0.33px;
  bottom: 0.625rem;
`;

const BorderContainer = styled.div`
    border-bottom: 0.33px solid var(--Primary-light-active, #c9e0fd);
`
