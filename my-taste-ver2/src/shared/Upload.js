import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Image } from '../elements';
import { actionCreators as imageActions } from '../redux/modules/image';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';

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
        size="250px"
        src={
          preview
            ? preview
            : 'https://firebasestorage.googleapis.com/v0/b/my-taste-e6d3f.appspot.com/o/camera.png?alt=media&token=212104aa-9013-45dd-9478-4914cf9f54cf'
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
    </Grid>
  );
};

const Btn = styled.div`
  position: relative;
  left: 0;
`;
export default Upload;
