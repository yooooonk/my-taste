import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FormControlLabel, RadioGroup, Radio, Switch } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as viewActions } from '../redux/modules/view';

const LayoutPicker = () => {
  const dispatch = useDispatch();
  const layout = useSelector((state) => state.view.layout);

  const handleRadioChange = (event) => {
    dispatch(viewActions.setLayout(event.target.value));
  };
  return (
    <div>
      <RadioGroup
        row
        aria-label="gender"
        name="gender1"
        value={layout}
        onChange={handleRadioChange}
      >
        <FormControlLabel
          value="top-bottom"
          control={<Radio />}
          label="위아래"
        />
        <FormControlLabel
          value="bottom-top"
          control={<Radio />}
          label="아래위"
        />
        <FormControlLabel value="row" control={<Radio />} label="나란히" />
        <FormControlLabel
          value="reverse-row"
          control={<Radio />}
          label="거꾸로 나란히"
        />
      </RadioGroup>
    </div>
  );
};

export default LayoutPicker;
