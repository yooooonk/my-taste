import React from 'react';
import styled from 'styled-components';
import { Button, Wrapper } from '../elements';
const Dialog = (props) => {
  /* 
  dialog에 필요한 state

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [modalMsg, setModalMsg] = useState(false)
  const [modalAcceptEvent, setModalAcceptEvent] = useState(false)
  const [modalCancelEvent, setModalCancelEvent] = useState(false) */

  const { isOpen, msg, accept, cancel } = props;

  return (
    <Container show={isOpen}>
      <Background onClick={cancel} />
      <Modal id="modal">
        {msg}
        <Wrapper>
          <Button _onClick={accept}>예</Button>
          <Button _onClick={cancel}>아니요</Button>
        </Wrapper>
      </Modal>
    </Container>
  );
};

Dialog.defaultProps = {
  isOpen: false,
  msg: '하하하호호호',
  accept: () => {
    console.log('예');
  },
  cancel: () => {
    console.log('아니요');
  }
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  ${(props) => props.theme.flex_row};
  justify-content: center;
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Modal = styled.div`
  position: relative;
  background-color: white;
  width: 300px;
  height: 100px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 10px;
  ${(props) => props.theme.flex_column};
  padding: 1rem;
`;

export default Dialog;
