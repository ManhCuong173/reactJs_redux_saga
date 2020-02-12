const styles = theme => ({
  modal: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    outline: 'none',
    paddingBottom: 20,
  },
  header: {
    backgroundColor: theme.color.primary,
    padding: 15,
    color: theme.color.white,
  },
});

export default styles;
