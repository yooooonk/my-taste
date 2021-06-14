import styled from 'styled-components';
import React from 'react';
const Image = (props) => {
  const { _onClick, size } = props;

  return <ImageShape size={size} {...props} onClick={_onClick}></ImageShape>;
};

Image.defaultProps = {
  is_circle: false,
  size: 3,
  radius: '1rem',
  _onClick: () => {},
  _onDelete: () => {},
  margin: '4px'
};

const ImageShape = styled.div`
  width: ${(props) => props.size}vw;
  height: ${(props) => props.size}vw;
  border-radius: ${(props) => (props.is_circle ? '50%' : props.radius)};
  background-image: url('${(props) => props.src}');
  background-size: cover;
  margin: ${(props) => props.margin};

  & > .icon {
    position: relative;
    left: 45%;
    &:hover {
      background-color: yellow;
    }
  }
`;

export default Image;
