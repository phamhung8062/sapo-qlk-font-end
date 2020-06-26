const styles = (theme) => ({
  drawerPaper: {
    width: 214,
    maxWidth: 230,
    zIndex: 10,
    position: 'relative',
    height: '900px',
    backgroundColor: '#202d3f',
    color: '#fffff',
  },
  menuLink: {
    textDecoration: 'none',
    color: theme.color.defaultTextColor,
    '&:hover': {
      textDecoration: 'none',
      background: '#3293fe',
    },
  },
  menuLinkActive: {
    '&>div': {
      backgroundColor: '#3293fe',
      color: '#ffffff',
      textDecoration: 'none',
    },
    '&>div:hover': {
      backgroundColor: '#3293fe',
    },
  },
  '&>div:hover': {
    backgroundColor: '#3293fe',
  },
  list: {
    // backgroundColor: 'red',
  },
});
export default styles;
