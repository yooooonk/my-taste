import React, { useEffect, useState } from 'react';
import { Button, Grid, Input, Text } from '../elements';
import Header from '../components/Header';
import styled from 'styled-components';
import { FormControlLabel, RadioGroup, Radio, Switch } from '@material-ui/core';
import Upload from '../shared/Upload';
import { MdClose } from 'react-icons/md';
import ErrorMsg from '../components/ErrorMsg';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { actionCreators as imageActions } from '../redux/modules/image';
import LayoutPicker from '../components/LayoutPicker';

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
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
    <PostWriteContainer>
      <Header>
        <Text bold>{postId ? '수정하기' : '기록하기'}</Text>
        <i />
      </Header>
      {!isMobile && <LayoutPicker />}
      <ContentsBox>
        <Upload size={isMobile ? '100vw' : '50vh'} />
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
      </ContentsBox>
      <Grid is_flex is_column padding="0 16px">
        <Wrapper>
          <Wrapper>
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
          </Wrapper>
        </Wrapper>

        <Input
          multiLine
          value={value}
          _onChange={(e) => setValue(e.target.value)}
        />
      </Grid>
      <Grid is_flex is_column padding="0 16px" margin="10px">
        <ErrorMsg valid={requireError}>사진과 감상은 꼭 입력해주세요</ErrorMsg>
        <Button
          width={isMobile ? '100%' : '50%'}
          disabled={!isPhrase && (!value || !preview)}
          _onClick={isPhrase ? addPhrase : write}
        >
          {isPhrase ? '문장 추가하기' : '저장하기'}
        </Button>
      </Grid>
    </PostWriteContainer>
  );
};

const Phrase = styled.div`
  border-radius: 10px;
  background-color: #ffe9ed;
  padding: 0 10px;
  width: 100%;
  margin: 1px 0;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const ContentsBox = styled.div`
  background-color: skyblue;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    padding: 0;
  }

  @media ${(props) => props.theme.tablet} {
    width: 100%;
    padding: 0;
  }

  @media ${(props) => props.theme.desktop} {
    flex-direction: row;
    width: 96%;
  }
`;

const Wrapper = styled.div`
  background-color: skyblue;
  width: 100%;
  ${(props) => props.theme.flex_row}
  justify-content:center;
`;

const PostWriteContainer = styled.div`
  ${(props) => props.theme.flex_column}
  background-color: yellow;
  width: 90%;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }

  @media ${(props) => props.theme.tablet} {
    width: 100%;
  }
`;
export default PostWrite;
