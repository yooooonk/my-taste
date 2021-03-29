import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  const { _onClick, children, margin, width, height } = props;

  const styles = { margin, width, height };
  return (
    <Btn {...styles} onClick={_onClick}>
      {children}
    </Btn>
  );
};

Button.defaultProps = {
  _onClick: () => {},
  children: null,
  margin: false,
  width: '100%',
  height: '25px'
};

const Btn = styled.button`
  border-radius: 10px;
  background-color: #fffffc;
  border: 1px solid var(--main-color);
  text-align: center;
  color: var(--main-color);
  width: ${(props) => props.width};
  height: ${(props) => props.heigth};
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
  cursor: pointer;
  &:hover {
    background-color: var(--main-color);
    color: #fffffc;
  }
`;

export default Button;
