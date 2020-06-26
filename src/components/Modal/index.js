import React, { Component } from 'react';

import { withStyles, Modal } from '@material-ui/core';
import styles from './styles';
import PropTypes from 'prop-types';
import CloseIcons from '@material-ui/icons/Clear';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as modalActions from '../../action/modal';
class ModalTask extends Component {
  render() {
    const {
      open,
      classes,
      component,
      modalActionCreators,
      tittle,
    } = this.props;
    const { hideModal } = modalActionCreators;
    return (
      <Modal open={open} onClose={hideModal}>
        <div className={classes.modal}>
          <div className={classes.header}>
            <span className={classes.tittle}>{tittle}</span>
            <CloseIcons className={classes.icon} onClick={hideModal} />
          </div>
          <div className={classes.content}>{component}</div>
        </div>
      </Modal>
    );
  }
}
ModalTask.propTypes = {
  open: PropTypes.bool,
  hideModal: PropTypes.func,
  classes: PropTypes.object,
  component: PropTypes.object,
  tittle: PropTypes.string,
  modalActionCreators: PropTypes.shape({
    hideModal: PropTypes.func,
  }),
};
const mapStateToProps = (state) => {
  return {
    open: state.modal.showModal,
    component: state.modal.component,
    tittle: state.modal.title,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    modalActionCreators: bindActionCreators(modalActions, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
// export default withStyles(styles)(GolbalLoading);
export default compose(withStyles(styles), withConnect)(ModalTask);
