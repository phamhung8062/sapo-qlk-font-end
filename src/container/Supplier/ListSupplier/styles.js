const styles = (theme) => ({
  root: {
    padding: theme.spacing(3),
    background: '#f4f6f8',
  },
  content: {
    padding: 0,
    marginTop: theme.spacing(2),
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  search: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420,
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px',
  },
  button: {
    background: 'linear-gradient(180deg,#08f,#4697fe)',
    color: 'white',
    float: 'right',
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
  },
  haha: {
    '&>div.popover': {
      maxWidth: 500,
      transform: 'translate3d(264px, 185px, 0px)!important',
      marginTop: 18,
    },
    '&&>div span.arrow': {
      left: '70px !important',
    },
  },
  button2: {
    '&:focus': {
      outline: 0,
    },
    '&:active': {},
    padding: 0,
    color: '#495057',
    background: 'linear-gradient(180deg,#e9ecef,#e9ecef)',
  },
  cell: {
    borderBottom: 'none',
    marginLeft: '-16px',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
    fontSize: '12px',
    fontWeight: '400',
    // padding: 0,
  },
  cell1: {
    borderBottom: 'none',
    marginLeft: '-16px',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
    fontSize: '12px',
    fontWeight: '400',
    // padding: 0,
  },
});
export default styles;
