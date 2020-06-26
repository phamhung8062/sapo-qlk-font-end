import React, { Component } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/styles';
import Header from './Header';
import Sidebar from './Sidebar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as UiActions from '../../action/ui';
import cn from 'classnames';
class Dashboard extends Component {
  handleOnTogleSidebar = (value) => {
    const { UiActionsCreators } = this.props;
    const { hideSidebar, showSidebar } = UiActionsCreators;
    if (value === true) {
      showSidebar();
    } else {
      hideSidebar();
    }
  };

  render() {
    const { children, classes, name, showSidebar } = this.props;
    return (
      <div className={classes.dashboard}>
        <Header
          name={name}
          showSidebar={showSidebar}
          onTogleSidebar={this.handleOnTogleSidebar}
        />
        <div className={classes.wrapper}>
          <Sidebar
            showSidebar={showSidebar}
            onTogleSidebar={this.handleOnTogleSidebar}
          />
          <div
            className={cn(classes.wrapperContent, {
              [classes.shiftLeft]: showSidebar === false,
            })}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  children: PropTypes.object,
  classes: PropTypes.object,
  name: PropTypes.string,
  showSidebar: PropTypes.bool,
  UiActionsCreators: PropTypes.shape({
    showSidebar: PropTypes.func,
    hideSidebar: PropTypes.func,
  }),
};
const mapStateToProp = (state) => {
  return { showSidebar: state.ui.showSidebar };
};
const mapDispatchToProp = (dispatch) => {
  return {
    UiActionsCreators: bindActionCreators(UiActions, dispatch),
  };
};
const withConnect = connect(mapStateToProp, mapDispatchToProp);
export default compose(withConnect, withStyles(styles))(Dashboard);
