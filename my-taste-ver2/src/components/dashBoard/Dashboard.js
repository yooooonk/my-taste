import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { bookActions } from '../../redux/modules/book';
import DashboardCard from './DashboardCard';

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const bookBasket = useSelector((state) => state.book.bookBasket);

  useEffect(() => {
    dispatch(bookActions.fetchBookBasket());
  }, []);

  return (
    <Container>
      <CardWrapper>
        {/*  <DashboardCard data={dashboardData.basketCount} type={'basketCount'} /> */}
      </CardWrapper>
    </Container>
  );
};

Dashboard.propTypes = {};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const CardWrapper = styled.div`
  width: 100%;
  height: 50%;
  background-color: skyblue;
`;
export default Dashboard;
