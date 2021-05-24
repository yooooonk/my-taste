import React from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import Dashboard from '../components/dashBoard/Dashboard';
import NoLoginMain from '../components/NoLoginMain';

const Home = (props) => {
  const isLogin = useSelector((state) => state.user.isLogin);
  return (
    <Container>
      {!isLogin && <NoLoginMain />}
      {isLogin && <Dashboard />}
    </Container>
  );
};

Home.propTypes = {};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
export default Home;
