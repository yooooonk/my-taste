import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Grid, Image } from '../elements';
import { actionCreators as imageActions } from '../redux/modules/image';
const Upload = () => {
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
    <Grid>
      <Image
        size="250"
        src={
          preview
            ? preview
            : 'https://s3.ap-northeast-2.amazonaws.com/yoooook.xyz/camera.png'
        }
        _onClick={onClickImageUpload}
        _onDelete={deletePreview}
      />
      <input
        type="file"
        name="image"
        multiple
        hidden
        disabled={uploading}
        ref={imageInput}
        onChange={onChangeImages}
      />
    </Grid>
  );
};

export default Upload;
