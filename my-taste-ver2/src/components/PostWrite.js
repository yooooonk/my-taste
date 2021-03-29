import React, { useState } from 'react';
import { Button, Grid, Input } from '../elements';
import Header from './Header';
import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Upload from '../shared/Upload';
import { MdClose } from 'react-icons/md';
import ErrorMsg from './ErrorMsg';
const PostWrite = () => {
  const [isPhrase, setIsPhrase] = useState(false);
  const [isOverTen, setIsOverTen] = useState(false);
  const [value, setValue] = useState('');
  const [phraseList, setPhraseList] = useState([]);
  const handleChange = (e) => {
    setIsPhrase(e.target.checked);
  };

  const write = (e) => {
    console.log('꺅');
  };

  const addPhrase = (e) => {
    if (!value) return;
    if (phraseList.length >= 10) {
      return setIsOverTen(true);
    }
    setPhraseList([...phraseList, value]);
    setValue('');
  };

  const deletePhrase = (idx) => {
    let temp = phraseList;
    temp.splice(idx, 1);
    setPhraseList([...temp]);
  };
  return (
    <Grid is_flex is_column>
      <Header>기록하기</Header>
      <Grid is_flex is_column>
        <Upload />
        <Grid is_flex is_column padding="0 16px">
          {phraseList.map((p, idx) => {
            return (
              <Grid key={idx}>
                <Phrase>{p}</Phrase>
                <MdClose
                  onClick={(e) => {
                    deletePhrase(idx);
                  }}
                />
              </Grid>
            );
          })}
          <ErrorMsg valid={phraseList.length >= 10}>
            10개까지만 추가할 수 있어요
          </ErrorMsg>
        </Grid>
        <Grid is_flex is_column padding="0 16px">
          <FormControlLabel
            control={
              <Switch
                checked={isPhrase}
                onChange={handleChange}
                name="checkedA"
              />
            }
            label={isPhrase ? '문장' : '감상'}
          />
          <Input
            multiLine
            value={value}
            _onChange={(e) => setValue(e.target.value)}
          />
        </Grid>
        <Grid padding="0 16px" margin="10px">
          <Button _onClick={isPhrase ? addPhrase : write}>
            {isPhrase ? '추가하기' : '저장하기'}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Phrase = styled.div`
  border-radius: 10px;
  background-color: yellow;
  padding: 0 10px;
  width: 100%;
  margin: 1px;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export default PostWrite;
