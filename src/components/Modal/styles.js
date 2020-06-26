const styles = (theme) => ({
  modal: {
    top: '10%',
    left: '30%',
    transform: 'translate(- 50%, - 50%)',
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 4),
    ouline: 'none',
  },
  textField: {
    width: '100%',
  },
  header: {
    background: theme.color.primary,
    color: theme.color.textColor,
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: ' space-between',
  },
  tittle: {
    color: theme.color.textColor,
    textAlign: 'center',
    fontWieght: 700,
    textTransform: 'capitalize',
  },
  icon: {
    cursor: 'pointer',
    fontSize: 30,
  },
  content: {
    padding: theme.spacing(2),
  },
});
export default styles;
