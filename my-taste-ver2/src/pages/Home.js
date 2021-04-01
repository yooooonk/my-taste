import React from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import Wrapper from '../elements/Wrapper';

const Home = (props) => {
  const { isMobile } = useSelector((state) => state.view);

  return (
    <Wrapper is_column={isMobile} height="100vh">
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
    </Wrapper>
  );
};

Home.propTypes = {};

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

const Title = styled.div`
  font-family: $ballo;
  font-size: 10vh;
  line-height: 75px;
  text-transform: uppercase;
  color: white;
  font-family: var(--roboto);
  span {
    width: 100%;
    float: left;
    display: block;

    /* -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
                    clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%); */
    transform: translateY(-50px);
    opacity: 0;
    animation: ${titleAnimation} ease 10s infinite;

    &:first-child {
      animation-delay: 0.3s;
      color: #ffb9c6;
    }

    &:nth-child(2) {
      color: rgb(255, 123, 147);
    }

    &:last-child {
      animation-delay: 0.5s;
      color: ${(props) => props.theme.main_color};
    }
  }
`;

const Description = styled.div`
  color: gray;
  font-size: 3vh;

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
`;
export default Home;
