import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '.';

const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    multiLine,
    value,
    is_submit,
    onSubmit
  } = props;

  if (multiLine) {
    return (
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <Textarea
          rows={10}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
        ></Textarea>
      </Grid>
    );
  }
  return (
    <React.Fragment>
      {label && <Text margin="0px">{label}</Text>}
      {is_submit ? (
        <TextInput
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          value={value}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onSubmit(e);
            }
          }}
        />
      ) : (
        <TextInput type={type} placeholder={placeholder} onChange={_onChange} />
      )}
    </React.Fragment>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: '',
  type: 'text',
  value: '',
  is_submit: false,
  onSubmit: () => {},
  _onChange: () => {}
};

const TextInput = styled.input`
  border: none;
  background-color: ${(props) => props.theme.color.gray};
  width: 100%;
  height: 1.75rem;
  padding: 12px 4px;
  box-sizing: border-box;
  border-radius: 5px;

  &::placeholder {
    font-size: 0.5rem;
  }
`;

const Textarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Input;
