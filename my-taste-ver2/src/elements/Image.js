import styled from 'styled-components';
import React from 'react';

const Image = (props) => {
  //const { is_circle, src, size, radius } = props;
  const { _onClick } = props;

  /* const styles = {
    src: src,
    size: size,
    is_circle: is_circle
  }; */

  return <ImageShape {...props} onClick={_onClick}></ImageShape>;
};

Image.defaultProps = {
  is_circle: false,
  src: 'https://s3.ap-northeast-2.amazonaws.com/yoooook.xyz/camera.png',
  size: 36,
  radius: 0,
  _onClick: () => {}
};

const ImageShape = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: ${(props) => (props.is_circle ? '50%' : props.radius)};

  background-image: url('${(props) => props.src}');
  background-size: cover;
  margin: 4px;
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
