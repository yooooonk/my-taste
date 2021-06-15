import React from 'react';
import { MdClose } from 'react-icons/md';
import { Grid, I } from '../../elements';
import styled from 'styled-components';
import ErrorMsg from '../ErrorMsg';
import Wrapper from '../../elements/Wrapper';
import { useSelector } from 'react-redux';

const PhraseList = (props) => {
  const { phraseList, _onClick } = props;

  return (
    <Container>
      {phraseList?.map((p, idx) => {
        return (
          <PharaseWrapper key={idx}>
            <Phrase>{p}</Phrase>

            <MdClose onClick={() => _onClick(idx)} />
          </PharaseWrapper>
        );
      })}
      <ErrorMsg valid={phraseList.length >= 10}>
        10개까지만 추가할 수 있어요
      </ErrorMsg>
    </Container>
  );
};

PhraseList.defaultProps = {
  _onClick: () => {},
  phraseList: []
};

const Container = styled.div`
  width: 100%;
`;

const PharaseWrapper = styled.div`
  ${(props) => props.theme.flex_row};
  width: 100%;
  margin: 0.25rem 0;

  &:hover {
    & div {
      opacity: 1;
    }
  }

  & svg {
    cursor: pointer;
  }
`;
const Phrase = styled.div`
  border-radius: 10px;
  background-color: ${(props) => props.theme.color.gray_light};
  opacity: 0.8;
  width: 100%;
  padding: 0.2rem;

  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export default PhraseList;
