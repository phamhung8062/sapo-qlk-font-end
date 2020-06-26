const styles = (theme) => ({
  label: {
    minWidth: '50%',
  },
  field: {
    display: 'flex',
  },
  div: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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
    background: 'linear-gradient(180deg,#08f,#4697fe)',
    color: '#ffffff',
    float: 'right',
    marginRight: '10px',
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
  pay: {
    marginTop: 0,
  },
  paycard: {
    padding: 0,
  },
  badge: {
    fontSize: '12px',
    borderRadius: '10px',
    backgroundColor: 'hsla(0,0%,60%,.5)',
    padding: '3px 7px',
    border: '1px solid #fff',
    fontWeight: '400',
    color: '#212b35',
  },
  pos: {
    marginTop: 10,
  },
  tag: {
    backgroundColor: '#08f',
    fontSize: '13px',
    color: '#fff',
    padding: '2px 5px 4px',
    borderRadius: '4px',
    margin: '0 3px 3px 0',
    display: 'inline-block',
  },
  titlepayment: {
    float: 'left',
    width: '60%',
    minWidth: '350px',
    marginLeft: '12px',
  },
  a: {
    '&:hover': {
      // color: 'yellow',
      textDecoration: 'none',
    },
  },
});
export default styles;
