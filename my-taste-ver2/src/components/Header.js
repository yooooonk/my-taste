import React from 'react';
import { Grid, Text } from '../elements';
import { history } from '../redux/configStore';
import { MdKeyboardArrowLeft } from 'react-icons/md';

const Header = (props) => {
  const { children, _onClick } = props;
  return (
    <Grid>
      <MdKeyboardArrowLeft onClick={_onClick} />
      <Text>{children}</Text>
      <i />
    </Grid>
  );
};

Header.defaultProps = {
  children: null,
  _onClick: () => {
    history.replace('/');
  }
};

export default Header;
