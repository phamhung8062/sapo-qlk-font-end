const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    // margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
    width: '150px',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.color.primary,
  },
  login: {
    background: 'url(/sapo.png)',
    maxHeight: '588px',
    height: '588px',
    width: '100%',
  },
  content: {
    float: 'left',
  },
  container: {
    marginTop: 'calc((100vh - 588px)/2)',
    marginLeft: '193px',
    marginRight: 'auto',
  },
});
export default styles;
