import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../redux/modules/post';
import Permit from '../shared/Permit';
import CommentList from '../components/post/CommentList';
import CommentWrite from '../components/post/CommentWrite';
import Post from '../components/post/Post';
import styled from 'styled-components';
import { Grid, Wrapper } from '../elements';
import ImageCarousel from '../components/ImageCarousel';
import PostHeader from '../components/post/PostHeader';
import { TiHeart, TiHeartOutline, TiMessage } from 'react-icons/ti';

const PostDetail = (props) => {
  const { history } = props;
  const dispatch = useDispatch();

  const { list } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  const { isMobile } = useSelector((state) => state.common);

  const id = props.match.params.id;
  const idx = list.findIndex((p) => p.id === id);
  const post = list[idx];
  const uid = user?.uid;
  let like = post.likers.includes(uid);
  useEffect(() => {
    if (post) return;
    dispatch(postActions.fetchPost(id));
  });
  const onUnlike = (e) => {
    e.stopPropagation();
    if (!uid) return alert('로그인을 해주세요');
    dispatch(postActions.unlikePostFB(id));
  };

  const onLike = (e) => {
    e.stopPropagation();
    if (!uid) return alert('로그인을 해주세요');
    dispatch(postActions.likePostFB(id));
  };

  const editPost = (e) => {
    e.stopPropagation();
    history.push(`/edit/${id}`);
  };

  const deletePost = (e) => {
    e.stopPropagation();

    dispatch(postActions.fetchDeletePost(post.id, post.basketId));
  };

  if (!post) return null;

  return (
    <Container>
      <ImageWrapper>
        <ImageCarousel
          image={post.image_url}
          phraseList={post.phraseList}
          size={25}
        />
      </ImageWrapper>
      <Contents>
        <PostHeader
          src={post.user_info.user_profile}
          userName={post.user_info.user_name}
          isMe={uid === post.user_info.user_id}
          editPost={editPost}
          deletePost={deletePost}
        />
        <ButtonBox>
          {like && <TiHeart className="like" onClick={onUnlike} />}
          {!like && <TiHeartOutline className="dislike" onClick={onLike} />}
          좋아요 {post.likers.length}개
          <TiMessage className="comment" />
          댓글 {post.comment_cnt}개
        </ButtonBox>
        <Des>{post.contents}</Des>

        {uid && <CommentWrite post_id={id} />}

        <CommentList post_id={id} />
      </Contents>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${(props) => props.theme.color.blue};
  width: 100%;
  height: 100%;
  ${(props) => props.theme.flex_row};
`;

const ImageWrapper = styled.div`
  width: 50%;
  height: 100%;
  ${(props) => props.theme.flex_row};
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Contents = styled.div`
  width: 50%;
  height: 100%;
  background-color: ${(props) => props.theme.color.gray_light};
`;

const Des = styled.div``;

const ButtonBox = styled.div``;
export default PostDetail;
