import React from 'react';
import styled from 'styled-components';

const I = (props) => {
  const { size, color, children } = props;
  const styles = { size, color };
  return <Ic {...styles}>{children}</Ic>;
};

I.defaultProps = {
  children: null,
  color: 'white',
  size: '1.5em',
  border: '1px solid white'
};

const Ic = styled.span`
  & > * {
    color: ${(props) => props.color};
    font-size: ${(props) => props.size};
  }
`;

export default I;
