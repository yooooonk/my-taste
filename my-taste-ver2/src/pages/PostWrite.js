import React, { useEffect, useState } from 'react';
import { Button, Grid, Input, Text } from '../elements';
import Header from '../components/Header';
import styled from 'styled-components';
import { FormControlLabel, RadioGroup, Radio, Switch } from '@material-ui/core';
import Upload from '../shared/Upload';

import ErrorMsg from '../components/ErrorMsg';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { actionCreators as imageActions } from '../redux/modules/image';
import LayoutPicker from '../components/LayoutPicker';
import PhraseList from '../components/PhraseList';
import Wrapper from '../elements/Wrapper';

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.post);
  const { preview } = useSelector((state) => state.image);
  const { isMobile, layout } = useSelector((state) => state.view);
  const [requireError, setRequireError] = useState(false);

  const postId = props.match.params.id;
  let idx = list.findIndex((p) => p.id === postId);
  let post = list[idx];

  const [isPhrase, setIsPhrase] = useState(false);
  const [value, setValue] = useState('');
  const [phraseList, setPhraseList] = useState([]);
  const handleChange = (e) => {
    setIsPhrase(e.target.checked);
  };

  useEffect(() => {
    if (!postId) return;

    if (post) return;

    dispatch(postActions.getOnePostFB(postId));
  }, []);

  useEffect(() => {
    if (!post) return;
    dispatch(imageActions.setPreview(post.image_url));
    setPhraseList(post.phraseList);
    setValue(post.contents);
  }, [post]);

  const write = (e) => {
    if (!value || !preview) {
      setRequireError(true);
      return;
    }
    if (postId) {
      // 수정
      let updatedPost = {
        ...post,
        phraseList: phraseList,
        contents: value
      };
      dispatch(postActions.editPostFB(postId, updatedPost));
    } else {
      //추가
      dispatch(postActions.addPostFB(value, phraseList));
    }
  };

  const addPhrase = (e) => {
    if (!value) return;
    if (phraseList.length >= 10) return;
    setPhraseList([...phraseList, value]);
    setValue('');
  };

  const deletePhrase = (idx) => {
    let temp = phraseList;
    temp.splice(idx, 1);
    setPhraseList([...temp]);
  };
  return (
    <Wrapper is_column width={isMobile ? '100%' : '90%'}>
      <Header>
        <Text bold>{postId ? '수정하기' : '기록하기'}</Text>
        <i />
      </Header>
      <Wrapper is_column>
        <Wrapper is_column={isMobile} width={isMobile ? '100%' : '35vw'}>
          <Upload size={isMobile ? '100vw' : '50vh'} />
          <PhraseList phraseList={phraseList} _onClick={deletePhrase} />
        </Wrapper>
        <Wrapper is_column>
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
          <ErrorMsg valid={requireError}>
            사진과 감상은 꼭 입력해주세요
          </ErrorMsg>
          <Button
            width={isMobile ? '100%' : '50%'}
            disabled={!isPhrase && (!value || !preview)}
            _onClick={isPhrase ? addPhrase : write}
            margin="10px"
          >
            {isPhrase ? '문장 추가하기' : '저장하기'}
          </Button>
        </Wrapper>
      </Wrapper>

      {/*  {layout === 'top-bottom' && (
        
      )}
      {layout === 'bottom-top' && (
        <Wrapper is_column>
          <Wrapper is_column>
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
            <ErrorMsg valid={requireError}>
              사진과 감상은 꼭 입력해주세요
            </ErrorMsg>
            <Button
              width={isMobile ? '100%' : '50%'}
              disabled={!isPhrase && (!value || !preview)}
              _onClick={isPhrase ? addPhrase : write}
              margin="10px"
            >
              {isPhrase ? '문장 추가하기' : '저장하기'}
            </Button>
          </Wrapper>
          <Wrapper is_column={isMobile} width={isMobile ? '100%' : '50%'}>
            <Upload size={isMobile ? '100vw' : '50vh'} />
            <PhraseList phraseList={phraseList} _onClick={deletePhrase} />
          </Wrapper>
        </Wrapper>
      )}
      {layout === 'row' && (
        <Wrapper ai="flex-start" is_column={isMobile}>
          <Wrapper is_column width={isMobile ? '100%' : '50%'}>
            <Upload size={isMobile ? '100vw' : '50vh'} />
            <PhraseList phraseList={phraseList} _onClick={deletePhrase} />
          </Wrapper>
          <Wrapper is_column>
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
            <ErrorMsg valid={requireError}>
              사진과 감상은 꼭 입력해주세요
            </ErrorMsg>
            <Button
              width={isMobile ? '100%' : '50%'}
              disabled={!isPhrase && (!value || !preview)}
              _onClick={isPhrase ? addPhrase : write}
              margin="10px"
            >
              {isPhrase ? '문장 추가하기' : '저장하기'}
            </Button>
          </Wrapper>
        </Wrapper>
      )}
      {layout === 'reverse-row' && (
        <Wrapper ai="flex-start" is_column={isMobile}>
          <Wrapper is_column>
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
            <ErrorMsg valid={requireError}>
              사진과 감상은 꼭 입력해주세요
            </ErrorMsg>
            <Button
              width={isMobile ? '100%' : '50%'}
              disabled={!isPhrase && (!value || !preview)}
              _onClick={isPhrase ? addPhrase : write}
              margin="10px"
            >
              {isPhrase ? '문장 추가하기' : '저장하기'}
            </Button>
          </Wrapper>
          <Wrapper is_column width={isMobile ? '100%' : '50%'}>
            <Upload size={isMobile ? '100vw' : '50vh'} />
            <PhraseList phraseList={phraseList} _onClick={deletePhrase} />
          </Wrapper>
        </Wrapper>
      )} */}

      <Grid is_flex is_column padding="0 16px" margin="10px"></Grid>
    </Wrapper>
  );
};

export default PostWrite;
