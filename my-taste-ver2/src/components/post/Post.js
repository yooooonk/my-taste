import React, { useState } from 'react';
import { Grid, Text, Wrapper } from '../../elements';
import { TiHeart, TiHeartOutline, TiMessage } from 'react-icons/ti';

import ImageCarousel from '../ImageCarousel';
import Permit from '../../shared/Permit';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../../redux/modules/post';

import { history } from '../../redux/configStore';
import styled from 'styled-components';
import PostHeader from './PostHeader';

const Post = (props) => {
  const { user_info, basketId, id, _onClick } = props;

  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.user?.uid);

  const isMe = user_info.user_id === uid;

  let like = props.likers.includes(uid);

  const onUnlike = (e) => {
    e.stopPropagation();
    dispatch(postActions.unlikePostFB(id));
  };

  const onLike = (e) => {
    e.stopPropagation();
    dispatch(postActions.likePostFB(id));
  };

  const editPost = (e) => {
    e.stopPropagation();
    history.push(`/edit/${id}`);
  };

  const deletePost = (e) => {
    e.stopPropagation();

    dispatch(postActions.fetchDeletePost(id, basketId));
  };

  return (
    <PostWrapper>
      <PostHeader
        goBack={props.is_detail}
        src={props.user_info.user_profile}
        userName={props.user_info.user_name}
        isMe={isMe}
        editPost={editPost}
        deletePost={deletePost}
      />
      <ImageCarousel
        image={props.image_url}
        phraseList={props.phraseList}
        size={15}
      />

      <ButtonBox>
        <Permit>
          {like && <TiHeart className="like" onClick={onUnlike} />}
          {!like && <TiHeartOutline className="dislike" onClick={onLike} />}
          <TiMessage className="comment" onClick={_onClick} />
        </Permit>
      </ButtonBox>
      <Contents>
        {props.contents.length > 100
          ? props.contents.substring(0, 100) + '...'
          : props.contents}

        {props.contents.length > 100 && (
          <More size="13px" color="gray" onClick={_onClick}>
            더보기
          </More>
        )}
      </Contents>
    </PostWrapper>
  );
};

Post.defaultProps = {
  is_detail: false
};

const PostWrapper = styled.div`
  ${(props) => props.theme.flex_column};
  margin: 0.5rem;
  background-color: ${(props) => props.theme.color.gray_light};
  width: 25%;
  min-height: 75%;
  border-radius: 0.75rem;
  padding: 1rem;
  ${(props) => props.theme.boder_box};
  justify-content: flex-start;
`;

const ButtonBox = styled.div`
  width: 100%;
  font-size: 1.5rem;
  cursor: pointer;
  margin: 0.5rem 0;
  & .like,
  .dislike {
    color: ${(props) => props.theme.color.red};
  }

  & .comment {
    color: ${(props) => props.theme.color.navy};
  }
`;

const Contents = styled.div`
  color: ${(props) => props.theme.color.navy};
  font-size: 14px;
  text-align: left;
  width: 100%;
`;

const More = styled.span`
  color: ${(props) => props.theme.color.navy_light};
  margin: 0 0.5rem;
  cursor: pointer;
`;
export default Post;
