import React from 'react';
import { actionCreators as commentActions } from '../../redux/modules/comment';
import { Grid, Input, Button } from '../../elements';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const { post_id } = props;
  const [commentText, setCommentText] = React.useState('');
  const onChange = (e) => {
    setCommentText(e.target.value);
  };

  const write = () => {
    if (!commentText) return;
    dispatch(commentActions.addCommentFB(post_id, commentText));
    setCommentText('');
  };
  return (
    <Container>
      <Input
        placeholder="댓글 내용을 입력해주세요 :)"
        _onChange={onChange}
        value={commentText}
        onSubmit={write}
        is_submit
      />
      <Button
        width="50px"
        margin="0px 2px 0px 2px"
        disabled={!commentText}
        _onClick={write}
      >
        작성
      </Button>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 2vw;
  ${(props) => props.theme.flex_row};
  justify-content: space-between;
  width: 100%;
  margin: 2vw 0;
`;

export default CommentWrite;
