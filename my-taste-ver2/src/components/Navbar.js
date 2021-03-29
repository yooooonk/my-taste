import React from 'react';
import { Grid } from '../elements';

const Navbar = (props) => {
  return (
    <Grid>
      <Grid>My Taste</Grid>
      <Grid>로그인</Grid>
      <Grid>로그아웃</Grid>
    </Grid>
  );
};

Navbar.defaultProps = {};

export default Navbar;
