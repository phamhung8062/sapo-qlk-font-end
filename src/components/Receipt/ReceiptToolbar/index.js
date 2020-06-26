import { Button, withStyles, ButtonBase } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SearchInput from '../../SearchInput';
import styles from './styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
class ReceiptToolbar extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.row}>
          <span className={classes.spacer} />
          {/* <Button className={classes.importButton}>Import</Button>
          <Button className={classes.exportButton}>Export</Button> */}
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.setEdit}
          >
            <Link
              to="/receipt-create"
              style={{ textDecoration: 'none', color: '#f8f9fa' }}
            >
              Thêm Mới
            </Link>
          </Button>
        </div>
        {/* <div className={classes.row}>
          <SearchInput className={classes.searchInput} />
        </div> */}
      </div>
    );
  }
}
ReceiptToolbar.propTypes = {
  classes: PropTypes.object,
  productActionCreators: PropTypes.shape({
    ResetProductEditting: PropTypes.func,
  }),
};
const withConnect = connect(null, null);
export default compose(withStyles(styles), withConnect)(ReceiptToolbar);
