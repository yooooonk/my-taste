const size = {
  mobile: '767px',
  tablet: '1024px',
  desktop: '1025px'
};

const theme = {
  main_color: 'rgb(255, 82, 82)',
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
  box_size: `box-sizing:border-box`
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
