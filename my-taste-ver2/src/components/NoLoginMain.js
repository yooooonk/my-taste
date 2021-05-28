import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const NoLoginMain = (props) => {
  return (
    <Container>
      <Title>
        <span>Hello,</span>
        <span>My</span>
        <span>Taste</span>
      </Title>
      <Description>
        <span>좋아하는 것들을</span>
        <span>모으고,</span>
        <span>기록하세요</span>
      </Description>
    </Container>
  );
};

NoLoginMain.propTypes = {};

const desAnimation = keyframes`
 0%{
        transform: translateX(-50px);
        opacity: 0;
    }

    20%{
        transform: translateX(0);
        opacity: 1;
    }

    80%{
        transform: translateX(0);
        opacity: 1;
    }

    100%{
        transform: translateX(50px);
        opacity: 0;
    }

`;

const titleAnimation = keyframes`
  0% {
      transform: translateY(-50px);
      opacity: 0;
      -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
      clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
  }
  20% {
      transform: translateY(0);
      opacity: 1;
      -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
      clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
  }
  80% {
       transform: translateY(0);
       opacity: 1;
      -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
      clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
  }
  100% {
       transform: translateY(50px);
       opacity: 0;
      -webkit-clip-path: polygon(100% 0, 100% -0%, 0 100%, 0 100%);
      clip-path: polygon(100% 0, 100% -0%, 0 100%, 0 100%);    
  }

`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 1rem;
  ${(props) => props.theme.border_box};

  @media ${(props) => props.theme.desktop} {
    flex-direction: row;
  }
`;

const Title = styled.div`
  font-family: $ballo;
  font-size: 4rem;
  text-transform: uppercase;
  color: white;
  font-weight: bold;

  span {
    width: 100%;
    float: left;
    display: block;
    transform: translateY(-50px);
    opacity: 0;
    animation: ${titleAnimation} ease 10s infinite;
    width: 100%;
    &:first-child {
      animation-delay: 0.3s;
      color: ${(props) => props.theme.color.yellow};
    }

    &:nth-child(2) {
      color: ${(props) => props.theme.color.orange};
    }

    &:last-child {
      animation-delay: 0.5s;
      color: ${(props) => props.theme.color.blue};
    }
  }

  @media ${(props) => props.theme.desktop} {
    // width: 50%;
  }
`;

const Description = styled.div`
  color: gray;
  font-size: 1.5rem;
  text-align: right;
  width: 100%;
  span {
    display: block;
    animation: ${desAnimation} 10s ease 0.5s infinite;
    &:nth-child(2) {
      animation-delay: 0.8s;
    }

    &:nth-child(3) {
      animation-delay: 1.2s;
    }
  }

  @media ${(props) => props.theme.desktop} {
    width: 30%;
    text-align: left;
  }
`;

export default NoLoginMain;
