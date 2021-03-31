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
  &::-webkit-scrollbar {
    display: none;
  }

  background-color: ${(props) => props.theme.main_color};
  height: 99vh;
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
  }
`;

const Main = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
  background-color: ${(props) => props.theme.main_white};
  overflow-y: scroll;
  height: 90vh;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin: 0 auto;
  }

  @media ${(props) => props.theme.tablet} {
    width: 100%;
    margin: 0 auto;
  }

  @media ${(props) => props.theme.desktop} {
    width: 75%;
    margin-right: 30px;
    border-radius: 30px;
  }
`;

export default AppLayout;
