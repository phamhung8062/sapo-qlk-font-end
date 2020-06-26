/* eslint-disable react/no-deprecated */
/* eslint-disable react/jsx-props-no-spreading */
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Dashboard from '../../../components/Dashboard/index';
import styles from './styles';
import { AUTHORIZATION_KEY } from '../../../constants';
import axiosService from '../../axoisService';
class AdminLayoutRoute extends Component {
  componentWillMount() {
    const token = localStorage.getItem(AUTHORIZATION_KEY);
    if (token) {
      axiosService.setHeader('Authorization', `Bearers ${token}`);
    }
  }

  render() {
    const { component: YourComponent, ...remianProps } = this.props;
    const token = localStorage.getItem(AUTHORIZATION_KEY);
    return (
      // <Route
      //   {...remianProps}
      //   render={(routeProps) => {
      //     return (
      //       <Dashboard {...remianProps}>
      //         <YourComponent {...routeProps} />
      //       </Dashboard>
      //     );
      //   }}
      // />
      <Route
        {...remianProps}
        render={(routeProps) => {
          return token ? (
            <Dashboard>
              <YourComponent {...routeProps} />
            </Dashboard>
          ) : (
            <Redirect to="/login" />
          );
        }}
      />
    );
  }
}
AdminLayoutRoute.propTypes = {
  component: PropTypes.object,
  name: PropTypes.string,
  exact: PropTypes.bool,
  path: PropTypes.string,
};
export default withStyles(styles)(AdminLayoutRoute);
