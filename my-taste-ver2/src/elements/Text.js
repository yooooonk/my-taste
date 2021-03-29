import React from 'react';
import styled from 'styled-components';

const Text = (props) => {
  const { bold, color, size, children, font_family } = props;

  const styles = { bold, color, size, font_family };
  return <P {...styles}>{children}</P>;
};

Text.defaultProps = {
  children: null,
  bold: false,
  color: '#222831',
  size: '1em'
};

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? '600' : '400')};
`;

export default Text;