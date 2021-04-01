import React from 'react';
import styled from 'styled-components';

const Wrapper = (props) => {
  return <Box {...props}>{props.children}</Box>;
};
const Box = styled.div`
  width: ${(props) => (props.width ? props.width : '100%')};

  display: flex;
  flex-direction: ${(props) => (props.is_column ? 'column' : 'row')};
  justify-content: ${(props) => (props.jc ? props.jc : 'center')};
  align-items: ${(props) => (props.ai ? props.ai : 'center')};
`;
export default Wrapper;
