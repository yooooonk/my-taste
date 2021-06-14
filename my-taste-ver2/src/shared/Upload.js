import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Image } from '../elements';
import { actionCreators as imageActions } from '../redux/modules/image';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';

const Upload = ({ size }) => {
  const dispatch = useDispatch();
  const { uploading, preview } = useSelector((state) => state.image);
  const imageInput = useRef();

  const onClickImageUpload = () => {
    imageInput.current.click();
  };

  const onChangeImages = (e) => {
    const reader = new FileReader();
    const file = imageInput.current.files[0];
    if (!file) return;
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  const deletePreview = (e) => {
    e.stopPropagation();
    dispatch(imageActions.setPreview(null));
  };
  return (
    <Wrapper>
      <Image
        size={size}
        src={
          preview
            ? preview
            : 'https://firebasestorage.googleapis.com/v0/b/my-taste-e6d3f.appspot.com/o/noImage.png?alt=media&token=fc22498a-b954-42db-9683-5a958795adb0'
        }
        _onClick={onClickImageUpload}
        _onDelete={deletePreview}
      >
        {preview && (
          <Btn>
            <MdClose onClick={(e) => deletePreview(e)} />
          </Btn>
        )}
      </Image>
      <input
        type="file"
        name="image"
        multiple
        hidden
        disabled={uploading}
        ref={imageInput}
        onChange={onChangeImages}
      />
    </Wrapper>
  );
};

const Btn = styled.div`
  position: absolute;
  left: 50%;
`;

const Wrapper = styled.div`
  cursor: pointer;
  position: relative;
  width: 100%;
  justify-content: center;
  align-items: center;
  ${(props) => props.theme.boder_box};
  ${(props) => props.theme.flex_column};
`;
export default Upload;
