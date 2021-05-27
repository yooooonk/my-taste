import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

const AppLayout = ({ children }) => {
  return (
    <Container>
      <Navbar />
      <Main>{children}</Main>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${(props) => props.theme.color.gray};

  ${(props) => props.theme.border_box};
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }

  @media ${(props) => props.theme.tablet} {
    width: 100%;
  }

  @media ${(props) => props.theme.desktop} {
    ${(props) => props.theme.flex_row};
    height: 100vh;
  }
`;

const Main = styled.div`
  ${(props) => props.theme.border_box};
  &::-webkit-scrollbar {
    display: none;
  }

  background-color: ${(props) => props.theme.color.gray_light};
  overflow: scroll;
  width: 100%;
  padding: 0;

  @media ${(props) => props.theme.desktop} {
    width: 75%;
    margin-right: 30px;
    border-radius: 30px;
    height: 85vh;
    ${(props) => props.theme.flex_column}
  }
`;

export default AppLayout;
