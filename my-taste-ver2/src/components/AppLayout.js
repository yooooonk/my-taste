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
  width: 100%;
  height: 100vh;
  &::-webkit-scrollbar {
    display: none;
  }

  @media ${(props) => props.theme.desktop} {
    ${(props) => props.theme.flex_row};
    padding: 8rem;
  }
`;

const Main = styled.div`
  ${(props) => props.theme.border_box};
  &::-webkit-scrollbar {
    display: none;
  }

  overflow: scroll;
  width: 100%;
  padding: 0;
  height: 100%;

  @media ${(props) => props.theme.desktop} {
    width: 75%;
    height: 85vh;
    ${(props) => props.theme.flex_column}
    border-top-left-radius: 2.5rem;
    border-bottom-right-radius: 2.5rem;
  }
`;

export default AppLayout;
