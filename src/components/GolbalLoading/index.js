import React, { Component } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/styles';
import LoadingIcon from '../../assets/images/loading.gif';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
class GolbalLoading extends Component {
  render() {
    const { classes, showLoading } = this.props;
    let xhtml = null;
    if (showLoading) {
      xhtml = (
        <div className={classes.golbalLoading}>
          <img src={LoadingIcon} alt="loading" className={classes.icon} />

        </div>
      );
    }
    return xhtml;
  }
}
GolbalLoading.propTypes = {
  classes: PropTypes.object,
  showLoading: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    showLoading: state.ui.showLoading,
  };
};

const withConnect = connect(mapStateToProps, null);
// export default withStyles(styles)(GolbalLoading);
export default compose(withStyles(styles), withConnect)(GolbalLoading);
