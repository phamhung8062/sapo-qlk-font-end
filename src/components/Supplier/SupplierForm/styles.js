const styles = (theme) => ({
  col: {
    border: '1px solid #F3F5F7',
    backgroundColor: '#FFFFFF',
    borderRadius: '5px',
    padding: '10px',
    margin: '20px',
  },
  root: {
    padding: theme.spacing(5),
    background: '#f4f6f8',
  },
  content: {
    padding: 0,
    marginTop: theme.spacing(2),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
  rootsearch: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420,
  },
  addReceipt: {
    borderTop: '1px solid #dfe4e8',
    paddingTop: '15px',
    margin: '80px 0 30px',
    width: '100%',
    position: 'relative',
  },
  Button: {
    // background: 'linear-gradient(180deg,#08f,#4697fe)',
    float: 'right',
    marginLeft: '10px',
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
  header: {
    '&&>div span': {
      fontSize: '18px!important',
    },
  },
  card: {
    marginTop: 40,
  },
  roll: {
    color: '#637381',
    fontSize: '1.4rem',
    position: 'relative',
    left: '-7px',
  },
  a: {
    '&:hover': {
      // color: 'yellow',
      textDecoration: 'none',
    },
  },
});
export default styles;
