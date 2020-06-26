/* eslint-disable react/jsx-props-no-spreading */
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styles from './styles';
class DefaultLayoutRoute extends Component {
  render() {
    const { component: YourComponent, ...remianProps } = this.props;
    return (
      <Route
        {...remianProps}
        render={(routeProps) => {
          return <YourComponent {...routeProps} />;
        }}
      />
    );
  }
}
DefaultLayoutRoute.propTypes = {
  component: PropTypes.object,
  name: PropTypes.string,
  exact: PropTypes.bool,
  path: PropTypes.string,
};
export default withStyles(styles)(DefaultLayoutRoute);
