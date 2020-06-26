/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
import { MenuList } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTERS_MENU } from '../../../constants/index';
import styles from './styles';

import SidebarContext from './SidebarContext';

class Sidebar extends Component {
  toggleDrawer = (value) => {
    const { onTogleSidebar } = this.props;
    if (onTogleSidebar) {
      onTogleSidebar(value);
    }
  };

  renderList = () => {
    let xhtml = null;
    const { classes, router } = this.props;
    console.log('his', router);
    xhtml = (
      <div className={classes.list}>
        <MenuList component="div">
          {ADMIN_ROUTERS_MENU.map((item) => {
            return (
              <NavLink
                to={item.path}
                exact={item.exact}
                className={classes.menuLink}
                activeClassName={classes.menuLinkActive}
                key={item.path}
                style={{ color: 'antiquewhite' }}
              >
                <ListItem key={item.path} className={classes.menuItem} button>
                  {item.name}
                </ListItem>
              </NavLink>
            );
          })}
        </MenuList>
      </div>
    );
    return xhtml;
  };

  handleClick = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    const { classes, showSidebar } = this.props;
    return (
      <Drawer
        open={showSidebar}
        onClose={() => this.toggleDrawer(false)}
        classes={{
          paper: classes.drawerPaper,
        }}
        variant="persistent"
      >
        {/* <MatxVerticalNav /> */}
        {/* {this.renderList()} */}
        <MenuList component="div" style={{ paddingTop: 0 }}>
          <NavLink
            to="/receipts"
            className={classes.menuLink}
            activeClassName={classes.menuLinkActive}
            style={{ color: 'antiquewhite' }}
          >
            <ListItem
              className={classes.menuItem}
              button
              style={{ padding: 10 }}
            >
              <i className="fas fa-truck-moving fa-1x" /> &nbsp; &nbsp; &nbsp;
              <span
                style={{
                  fontSize: '13px',
                  fontFamily:
                    '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                }}
              >
                Nhập Kho
              </span>
            </ListItem>
          </NavLink>
          <NavLink
            to="/products"
            className={classes.menuLink}
            activeClassName={classes.menuLinkActive}
            style={{ color: 'antiquewhite' }}
          >
            <ListItem
              className={classes.menuItem}
              button
              style={{ padding: 10 }}
            >
              <i className="fas fa-box-open fa-1x" />
              &nbsp; &nbsp; &nbsp;{' '}
              <span
                style={{
                  fontSize: '13px',
                  fontFamily:
                    '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                }}
              >
                Sản Phẩm
              </span>
            </ListItem>
          </NavLink>
          <NavLink
            to="/suppliers"
            className={classes.menuLink}
            activeClassName={classes.menuLinkActive}
            style={{ color: 'antiquewhite' }}
          >
            <ListItem
              className={classes.menuItem}
              button
              style={{ padding: 10 }}
            >
              <i className="fas fa-user-tie fa-1x" />
              &nbsp; &nbsp; &nbsp;
              <span
                style={{
                  marginLeft: 5,
                  fontSize: '13px',
                  fontFamily:
                    '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                }}
              >
                {' '}
                Nhà Cung Cấp
              </span>
            </ListItem>
          </NavLink>
        </MenuList>
      </Drawer>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object,
  showSidebar: PropTypes.bool,
  onTogleSidebar: PropTypes.func,
};

Sidebar.contextType = SidebarContext;
export default withStyles(styles)(Sidebar);
