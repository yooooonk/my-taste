import React from 'react';
import { I } from '../elements';
import { history } from '../redux/configStore';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import Wrapper from '../elements/Wrapper';

const Header = (props) => {
  const { children, _onClick, goBack, bg } = props;
  return (
    <Wrapper bg={bg}>
      {goBack ? (
        <I color="gray">
          <MdKeyboardArrowLeft onClick={_onClick} />
        </I>
      ) : (
        <i />
      )}
      {children}
    </Wrapper>
  );
};

Header.defaultProps = {
  children: null,
  goBack: true,
  bg: 'white',
  _onClick: () => {
    history.goBack();
  }
};

export default Header;
