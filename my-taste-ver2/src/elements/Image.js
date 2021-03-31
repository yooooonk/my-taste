import styled from 'styled-components';
import React from 'react';
const Image = (props) => {
  const { _onClick } = props;

  return <ImageShape {...props} onClick={_onClick}></ImageShape>;
};

Image.defaultProps = {
  is_circle: false,
  src: 'https://s3.ap-northeast-2.amazonaws.com/yoooook.xyz/camera.png',
  size: '36px',
  radius: 0,
  _onClick: () => {},
  _onDelete: () => {},
  margin: '4px'
};

const ImageShape = styled.div`
  --size: ${(props) => props.size};
  width: var(--size);
  height: var(--size);
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
/* 
const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url('${(props) => props.src}');
  background-size: cover;
`;
 */
export default Image;
