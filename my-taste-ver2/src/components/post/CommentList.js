import React, { useEffect } from 'react';
import { Grid, Image, Text, Wrapper } from '../../elements';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as commentActions } from '../../redux/modules/comment';
import styled from 'styled-components';

const CommentList = (props) => {
  const { postId } = props;

  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comment.list);
  const { isMobile } = useSelector((state) => state.common);

  useEffect(() => {
    if (!commentList[postId]) {
      dispatch(commentActions.getCommentFB(postId));
    }
  }, []);
  if (!commentList[postId] || !postId) {
    return null;
  }
  return (
    <Container>
      {commentList[postId].map((c) => {
        return <CommentItem key={c.id} {...c} isMobile={isMobile} />;
      })}
    </Container>
  );
};

export default CommentList;

const CommentItem = (props) => {
  const {
    user_profile,
    user_name,
    user_id,
    postId,
    contents,
    insert_dt,
    isMobile
  } = props;
  return (
    <CommentItemContainer>
      <Wrapper width="20%">
        <Image is_circle src={user_profile} size={isMobile ? 10 : 3} />
      </Wrapper>
      <Wrapper is_column>
        <Wrapper jc="flex-start">
          <Text bold size="1rem" margin="0 3px">
            {user_name}
          </Text>
          <Text size="0.75rem">{contents}</Text>
        </Wrapper>
        <Wrapper jc="flex-start">
          <Text size="0.5rem">{insert_dt.split(' ')[0]}</Text>
        </Wrapper>
      </Wrapper>
    </CommentItemContainer>
  );
};

CommentItem.defaultProps = {
  user_profile: '',
  user_name: 'mean0',
  user_id: '',
  post_id: 1,
  contents: '귀여운 고양이네요!',
  insert_dt: '2021-01-01 19:00:00',
  src: 'https://firebasestorage.googleapis.com/v0/b/my-taste-e6d3f.appspot.com/o/noImage.png?alt=media&token=fc22498a-b954-42db-9683-5a958795adb0'
};

const Container = styled.div`
  width: 100%;
  ${(props) => props.theme.flex_column};
  justify-content: flex-start;
`;

const CommentItemContainer = styled.div`
  width: 100%;
  ${(props) => props.theme.flex_row};
  justify-content: flex-start;
`;
