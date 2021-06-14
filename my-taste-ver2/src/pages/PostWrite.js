import React, { useEffect, useState } from 'react';
import { Button, Grid, Input, Text } from '../elements';
import Header from '../components/Header';
import styled from 'styled-components';
import { FormControlLabel, RadioGroup, Radio, Switch } from '@material-ui/core';
import Upload from '../shared/Upload';

import ErrorMsg from '../components/ErrorMsg';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../redux/modules/post';
import { actionCreators as imageActions } from '../redux/modules/image';
import PhraseList from '../components/postWrite/PhraseList';
import Wrapper from '../elements/Wrapper';

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.post);
  const { preview } = useSelector((state) => state.image);
  const isMobile = useSelector((state) => state.common.isMobile);
  const [requireError, setRequireError] = useState(false);

  const isEdit = props.match.path.indexOf('edit') > -1;
  const id = props.match.params.id;

  let idx = list.findIndex((p) => p.id === id);
  let post = list[idx];

  const [isPhrase, setIsPhrase] = useState(false);
  const [value, setValue] = useState('');
  const [phraseList, setPhraseList] = useState([]);
  const handleChange = (e) => {
    setIsPhrase(e.target.checked);
  };

  useEffect(() => {
    console.log(
      '%c 💗Post 쓰기/수정💗',
      'color: rgb(0, 0, 0); font-size: 16px'
    );
    console.log('책의 감상과 좋았던 문장을 기록할 수 있습니다');
    console.log('스위치를 움직여 감상 - 문장을 남겨보세요');
    // 수정일 때
    if (!isEdit || !id) return;

    if (post) return;

    dispatch(postActions.fetchPost(id));
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
    if (isEdit) {
      // 수정
      let updatedPost = {
        ...post,
        phraseList: phraseList,
        contents: value
      };

      dispatch(postActions.fetchUpdatePost(id, updatedPost));
    } else {
      //추가
      dispatch(postActions.fetchCreatePost(id, value, phraseList));
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
    <Container>
      <Header bg="#f9dccd">
        <Text bold>{isEdit ? '수정하기' : '기록하기'}</Text>
        <i />
      </Header>
      <ContentsWrapper>
        <Wrapper width={isMobile ? '100%' : '50%'}>
          <Upload size={isMobile ? '95' : '20'} />
        </Wrapper>
        <Wrapper width={isMobile ? '100%' : '50%'}>
          <PhraseList phraseList={phraseList} _onClick={deletePhrase} />
        </Wrapper>
      </ContentsWrapper>
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
        <ErrorMsg valid={requireError}>사진과 감상은 꼭 입력해주세요</ErrorMsg>
        <Button
          width={isMobile ? '100%' : '50%'}
          disabled={!isPhrase && (!value || !preview)}
          _onClick={isPhrase ? addPhrase : write}
          margin="10px"
        >
          {isPhrase ? '문장 추가하기' : '저장하기'}
        </Button>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
  ${(props) => props.theme.flex_column};
  background-color: ${(props) => props.theme.color.orange_light};
  justify-content: space-between;

  ${(props) => props.theme.border_box};
  @media ${(props) => props.theme.desktop} {
    width: 100%;
  }
`;

const ContentsWrapper = styled.section`
  width: 100%;
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_column};
  @media ${(props) => props.theme.desktop} {
    flex-direction: row;
  }
`;
export default PostWrite;
