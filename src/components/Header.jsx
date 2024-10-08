import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as BackButton } from '../assets/svgs/back_button.svg';
import { ReactComponent as SearchButton } from '../assets/svgs/search_button.svg';
import { ReactComponent as HomeIcon } from '../assets/svgs/homeicon.svg';
import CloseButton from '../assets/svgs/close_button.svg';

export const Header = (props) => {
  /*
  props = {
    title: '페이지 상단 노출 제목',
    isSearch: 검색 기능 필요시 true, 아니면 false
    url: '바로 이전 페이지가 아닌 페이지로 이동할 때'
  };
  */

  const [isSearchMode, setIsSearchMode] = useState(false);
  const navigate = useNavigate();
  const bodyWidth = document.body.clientWidth;
  const handleLeftButtonClick = (event) => {
    event.stopPropagation();
    {
      props.url ? navigate(props.url, { replace: true }) : navigate(-1);
    }
  };
  const handleSearchButtonClick = (event) => {
    event.stopPropagation();
    setIsSearchMode(true);
  };

  const handleBodyClick = (event) => {
    setIsSearchMode(false);
  };

  const handleContainerClick = (event) => {
    event.stopPropagation();
  };

  const handleSearchInput = (event) => {
    props.setSearchValue(event.target.value);
  };

  const handleHomeButton = () => {
    navigate('/home');
  };

  useEffect(() => {
    document.body.addEventListener('click', handleBodyClick);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);

  return (
    <>
      {isSearchMode ? (
        <SearchContainer bodyWidth={bodyWidth} onClick={handleContainerClick}>
          <StyledBackButton
            src={BackButton}
            onClick={() => setIsSearchMode(false)}
            fill="#509BF7"
          />
          <InputText
            placeholder="검색어를 입력하세요"
            onChange={handleSearchInput}
          />
          <StyledSearchButton src={SearchButton} fill="#509BF7" />
        </SearchContainer>
      ) : (
        <Container bodyWidth={bodyWidth} onClick={handleContainerClick}>
          <LeftButtonWrapper onClick={handleLeftButtonClick}>
            {props.write ? (
              <StyledCloseButton src={CloseButton} />
            ) : (
              <StyledBackButton fill="#222222" />
            )}
          </LeftButtonWrapper>
          <Title onClick={props.onClick}>{props.title}</Title>
          {props.isSearch ? (
            <RightButtonWrapper onClick={handleSearchButtonClick}>
              <StyledSearchButton fill="#222222" />
            </RightButtonWrapper>
          ) : props.isNotHome ? (
            <RightButtonWrapper />
          ) : (
            <RightButtonWrapper>
              <HomeButton onClick={handleHomeButton}>
                <HomeIcon />
              </HomeButton>
            </RightButtonWrapper>
          )}
        </Container>
      )}
    </>
  );
};

const Container = styled.header`
  width: ${(props) => props.bodyWidth + 'px'};
  display: flex;
  height: 2.75rem;
  padding: 0.625rem;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  background: var(--Basic-White, #fff);
  box-sizing: border-box;
  z-index: 1000;
`;

const LeftButtonWrapper = styled.div`
  position: absolute;
  left: 0.62rem;
  display: flex;
  align-items: center;
`;

const RightButtonWrapper = styled.div`
  position: absolute;
  right: 0.62rem;
  display: flex;
  align-items: center;
`;

const StyledBackButton = styled(BackButton)`
  width: 1.5rem;
  height: 1.5rem;
`;

const StyledCloseButton = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const Title = styled.div`
  color: var(--Text-default, var(--Grayscale-Gray7, #222));
  text-align: center;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.0225rem;
  /* white-space: nowrap; */
`;

const StyledSearchButton = styled(SearchButton)`
  width: 1.5rem;
  height: 1.5rem;
`;

const SearchContainer = styled.div`
  width: ${(props) => props.bodyWidth + 'px'};
  position: fixed;
  top: 0;
  display: flex;
  height: 2.75rem;
  padding: 0.75rem 0.62rem;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  gap: 0.5rem;
  flex-shrink: 0;
  border: 0.33px solid var(--Blue-light-active, #c9e0fd);
  background: var(--Blue-light, #f4f9ff);
  box-sizing: border-box;
  z-index: 1000;
`;

const InputText = styled.input`
  display: flex;
  align-items: center;
  border: none;
  width: 85%;
  height: 1.1875rem;
  background: var(--Blue-light, #f4f9ff);
  ::placeholder {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1rem;
    font-weight: 500;
    line-height: 120%;
    letter-spacing: -0.02rem;
  }
  &:focus {
    color: var(--Text-default, var(--Grayscale-Gray7, #222));
    outline: none;
  }
`;

const HomeButton = styled.button`
  margin: 0;
  padding: 0;
  text-decoration: none;
  background-color: transparent;
  border: none;
`;
