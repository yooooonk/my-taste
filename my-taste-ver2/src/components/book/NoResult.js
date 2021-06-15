import React from 'react';
import styled from 'styled-components';
const NoResult = ({ msg }) => {
  return <Container>{msg}</Container>;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: ${(props) => props.theme.color.navy};
`;

export default NoResult;
