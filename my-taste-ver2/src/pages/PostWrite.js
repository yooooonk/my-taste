import React, { useEffect, useState } from 'react';
import { Button, Grid, Input, Text } from '../elements';
import Header from '../components/Header';
import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Upload from '../shared/Upload';
import { MdClose } from 'react-icons/md';
import ErrorMsg from '../components/ErrorMsg';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { actionCreators as imageActions } from '../redux/modules/image';

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  const { preview } = useSelector((state) => state.image);
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
    <Grid is_flex is_column>
      <Header>
        <Text>{postId ? '수정하기' : '기록하기'}</Text>
        <i />
      </Header>
      <Grid is_flex is_column>
        <Upload />
        <Grid is_flex is_column padding="0 16px">
          {phraseList.map((p, idx) => {
            return (
              <Grid key={idx}>
                <Phrase>{p}</Phrase>
                <MdClose
                  onClick={(e) => {
                    console.log(idx);
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
        <Grid is_flex is_column padding="0 16px" margin="10px">
          <ErrorMsg valid={requireError}>
            사진과 감상은 꼭 입력해주세요
          </ErrorMsg>
          <Button _onClick={isPhrase ? addPhrase : write}>
            {isPhrase ? '문장 추가하기' : '저장하기'}
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
