import React from 'react';
import styled from 'styled-components';

const Wrapper = (props) => {
  return <Box {...props}>{props.children}</Box>;
};

Wrapper.defaultProps = {
  bg: 'transparent',
  margin: 0,
  padding: 0
};
const Box = styled.div`
  width: ${(props) => (props.width ? props.width : '100%')};
  display: flex;
  height: ${(props) => (props.height ? props.height : '')};
  flex-direction: ${(props) => (props.is_column ? 'column' : 'row')};
  justify-content: ${(props) => (props.jc ? props.jc : 'center')};
  align-items: ${(props) => (props.ai ? props.ai : 'center')};
  background-color: ${(props) => props.bg};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  ${(props) => props.theme.border_box};
`;
export default Wrapper;
