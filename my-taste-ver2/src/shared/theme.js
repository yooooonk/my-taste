const size = {
  mobile: '767px',
  tablet: '1024px',
  desktop: '1025px'
};

const theme = {
  //main_color: 'rgb(255, 82, 82)',
  main_color: '#a7a39b',
  //main_white: '#fffcfc',
  main_white: '#fffcfc',
  pink: '#ffe4e5',
  border_box: `box-sizing:border-box`,
  mobile: `(max-width: 767px)`,
  tablet: `(max-width: 1024px)`,
  desktop: `(min-width: 1025px)`,
  flex_column:
    'display: flex; flex-direction:column; align-items: center; justify-content: space-between; ',
  flex_row:
    'display: flex; align-items: center; justify-content: space-between;',
  box_size: `box-sizing:border-box`,
  color: {
    red: '#f9685d',
    red_light: '#9998b',
    orange: '#ffbc92',
    orange_light: '#f9dccd',
    navy: '#3a5378',
    navy_light: '#b2c6e0',
    gray: '#e9ebec',
    gray_light: '#f7f8fa',
    blue: '#8fc1ca',
    blue_light: '#c5dee2',
    yellow: '#ffce6c',
    yellow_light: '#ffe5b8',
    green: '#5eada6',
    green_light: '#c8e1dc'
  }
};

/*
  https://howdy-mj.me/css/styled-components-with-global-style/

  @media screen and (max-width : 767px) {

}
  @media ${props => props.theme.table} {
    width: 100%;
    margin: 0 auto;
  } */

export default theme;
