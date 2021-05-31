import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from '../Header';
import { Image, Text, Wrapper } from '../../elements';
import { MdCreate, MdDelete } from 'react-icons/md';

const PostHeader = (props) => {
  const { goBack, src, userName, isMe, editPost, deletePost } = props;

  return (
    <Container>
      <Header goBack={goBack} bg="#f7f8fa">
        <Wrapper jc="flex-start">
          <Image size="2.5" is_circle src={src}></Image>
          <Text bold>{userName}</Text>
        </Wrapper>

        {isMe && (
          <Icons>
            <MdCreate onClick={editPost} />
            <MdDelete onClick={deletePost} />
          </Icons>
        )}
      </Header>
    </Container>
  );
};

PostHeader.propTypes = {};

const Container = styled.div`
  width: 100%;
`;

const Icons = styled.div`
  font-size: 1.5rem;
  width: 100%;
  text-align: right;
  color: ${(props) => props.theme.color.navy_light};

  & svg {
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.color.navy};
    }
  }
`;
export default PostHeader;
