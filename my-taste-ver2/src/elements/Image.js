import styled from 'styled-components';
import React from 'react';
const Image = (props) => {
  const { _onClick, size } = props;

  return <ImageShape size={size} {...props} onClick={_onClick}></ImageShape>;
};

Image.defaultProps = {
  is_circle: false,
  src: 'https://firebasestorage.googleapis.com/v0/b/my-taste-e6d3f.appspot.com/o/noImage.png?alt=media&token=fc22498a-b954-42db-9683-5a958795adb0',
  size: 3,
  radius: 0,
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
