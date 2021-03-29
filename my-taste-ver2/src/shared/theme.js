const size = {
  mobile: '767px',
  tablet: '991px',
  desktop: '992px'
};

const theme = {
  main_color: 'rgb(255, 82, 82)',
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  desktop: `(min-width: ${size.desktop})`,
  flex_column:
    'display: flex; align-items: center; justify-content: space-between; flex-direction:column',
  flex_row:
    'display: flex; align-items: center; justify-content: space-between;'
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
