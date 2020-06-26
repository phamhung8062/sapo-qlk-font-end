const styles = (theme) => ({
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  actions: {
    justifyContent: 'flex-end',
  },
  cell: {
    fontFamily:
      '-apple-system,BlinkMacSytemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
    fontSize: '14px',
    fontWeight: '400',
    borderBottom: '0!important',
  },
  tableRow: {
    '&:hover': {
      background: '#ebf5fa!important',
    },
  },
});
export default styles;
