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
  height: 100vh;
  ${(props) => props.theme.border_box};
  background-color: ${(props) => props.theme.main_color};

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin: 0 auto;
  }

  @media ${(props) => props.theme.tablet} {
    width: 100%;
    margin: 0 auto;
  }

  @media ${(props) => props.theme.desktop} {
    ${(props) => props.theme.flex_row}
    border-radius: 30px;
    margin: 3px;
    height: 99vh;
  }
`;

const Main = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }

  background-color: ${(props) => props.theme.main_white};
  overflow: scroll;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    padding: 0;
  }

  @media ${(props) => props.theme.tablet} {
    width: 100%;
    padding: 0;
  }

  @media ${(props) => props.theme.desktop} {
    width: 80%;
    margin-right: 30px;
    border-radius: 30px;
    height: 90vh;
    ${(props) => props.theme.flex_column}
  }
`;

export default AppLayout;
