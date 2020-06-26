import React, { Component } from 'react';
import styles from './styles';
import { withStyles, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
class SearchBox extends Component {
  render() {
    const { classes, handleChange } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <div>
          <TextField
            autoComplete="off"
            className={classes.textField}
            margin="normal"
            onChange={handleChange}
            placeholder="Nhập Từ Khóa..."
          />
        </div>
      </form>
    );
  }
}
SearchBox.propTypes = {
  classes: PropTypes.object,
  handleChange: PropTypes.func,
};
export default withStyles(styles)(SearchBox);
