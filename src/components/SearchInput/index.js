import React, { Component } from 'react';
import styles from './styles';
import { withStyles, Paper, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
class SearchInput extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <SearchIcon className={classes.icon} />
        <Input
          className={classes.input}
          disableUnderline
          placeholder="Nhập Từ Khóa..."
        />
      </Paper>
    );
  }
}
SearchInput.propTypes = {
  classes: PropTypes.object,
};
export default withStyles(styles)(SearchInput);
