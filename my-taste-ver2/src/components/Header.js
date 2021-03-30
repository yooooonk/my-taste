import React from 'react';
import { Grid, I, Text } from '../elements';
import { history } from '../redux/configStore';
import { MdKeyboardArrowLeft } from 'react-icons/md';

const Header = (props) => {
  const { children, _onClick, goBack } = props;
  return (
    <Grid>
      {goBack ? <MdKeyboardArrowLeft onClick={_onClick} /> : <i />}
      {children}
    </Grid>
  );
};

Header.defaultProps = {
  children: null,
  goBack: true,
  _onClick: () => {
    history.replace('/');
  }
};

export default Header;
