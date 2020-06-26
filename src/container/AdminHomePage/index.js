import React, { Component } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/styles';
class AdminHomePage extends Component {
  render() {
    return (
      <div>
        <img
          src="/kho5.png"
          alt="sapo"
          // style={{ maxWidth: 1135, height: '100%' }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(AdminHomePage);
