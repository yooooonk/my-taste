import React from 'react';
import { Grid, I, Text } from '../elements';
import { history } from '../redux/configStore';
import { MdKeyboardArrowLeft } from 'react-icons/md';

const Header = (props) => {
  const { children, _onClick, goBack, bg } = props;
  return (
    <Grid bg={bg}>
      {goBack ? (
        <I color="gray">
          <MdKeyboardArrowLeft onClick={_onClick} />
        </I>
      ) : (
        <i />
      )}
      {children}
    </Grid>
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
