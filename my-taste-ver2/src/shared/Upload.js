import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Grid, Image } from '../elements';
const Upload = () => {
  const dispatch = useDispatch();
  const imageInput = useRef();

  const onClickImageUpload = () => {
    imageInput.current.click();
  };

  const onChangeImages = (e) => {
    console.log(e);
  };
  return (
    <Grid>
      <Image size="250" _onClick={onClickImageUpload} />
      <input
        type="file"
        name="image"
        multiple
        hidden
        ref={imageInput}
        onChange={onChangeImages}
      />
    </Grid>
  );
};

export default Upload;
