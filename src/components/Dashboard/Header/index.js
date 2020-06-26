import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './styles';
import { withRouter } from 'react-router-dom';
import { AUTHORIZATION_KEY } from '../../../constants';
import axiosService from '../../../commons/axoisService';
const menuId = 'primary-search-account-menu';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleProfileMenuOpen = (e) => {
    this.setState({
      anchorEl: e.currentTarget,
    });
  };

  renderMenu = () => {
    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
      </Menu>
    );
  };

  handleLogout = () => {
    localStorage.removeItem(AUTHORIZATION_KEY);
    axiosService.removeHeader('Authorization');
    const { history } = this.props;
    if (history) {
      history.push('/login');
    }
  };

  handleToogleSibar = () => {
    const { showSidebar, onTogleSidebar } = this.props;
    if (onTogleSidebar) {
      onTogleSidebar(!showSidebar);
    }
  };

  render() {
    const { classes, name } = this.props;
    return (
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleToogleSibar}
            >
              <MenuIcon />
            </IconButton>
            <Typography>
            </Typography>
            {/* <Typography className={classes.title} variant="h6" noWrap>
              hahah
            </Typography> */}

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        {this.renderMenu()}
      </div>
    );
  }
}
Header.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string,
  showSidebar: PropTypes.bool,
  onTogleSidebar: PropTypes.func,
};
export default withStyles(styles)(withRouter(Header));
