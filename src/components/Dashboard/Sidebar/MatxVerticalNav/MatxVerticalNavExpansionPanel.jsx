/* eslint-disable no-return-assign */
/* eslint-disable react/sort-comp */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { Icon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TouchRipple from '@material-ui/core/ButtonBase';
import { withRouter } from 'react-router-dom';
import { classList } from './utils';

const styles = (theme) => {
  return {
    expandIcon: {
      transition: 'transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms',
      transform: 'rotate(90deg)',
      // marginRight: "16px"
    },
    collapseIcon: {
      transition: 'transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms',
      transform: 'rotate(0deg)',
      // marginRight: "16px"
    },
    'expansion-panel': {
      overflow: 'hidden',
      transition: 'max-height 0.3s cubic-bezier(0, 0, 0.2, 1)',
    },
    highlight: {
      background: theme.palette.primary.main,
    },
  };
};

class MatxVerticalNavExpansionPanel extends Component {
  state = {
    collapsed: true,
  };

  elementRef = React.createRef();

  componentHeight = 0;

  handleClick = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  calcaulateHeight(node) {
    if (node.name !== 'child') {
      for (const child of node.children) {
        this.calcaulateHeight(child);
      }
    }
    this.componentHeight += node.clientHeight;
  }

  componentDidMount() {
    const { location } = this.props;
    this.calcaulateHeight(this.elementRef);

    // OPEN DROPDOWN IF CHILD IS ACTIVE
    for (const child of this.elementRef.children) {
      if (child.getAttribute('href') === location.pathname) {
        this.setState({ collapsed: false });
      }
    }
  }

  render() {
    const { collapsed } = this.state;
    const { classes, children } = this.props;
    const { name, icon, iconText, badge } = this.props.item;
    console.log('icon', icon);
    return (
      <div>
        <TouchRipple
          className={classList({
            'nav-item items-center w-full has-submenu': true,
            open: !collapsed,
          })}
          onClick={this.handleClick}
        >
          <div className="flex items-center">
            {icon && <Icon className="align-middle item-icon">{icon}</Icon>}
            {iconText && (
              <span className="item-icon icon-text">{iconText}</span>
            )}
            <span className="align-middle item-text">{name}</span>
          </div>
          {badge && (
            <div className={`badge bg-${badge.color}`}>{badge.value}</div>
          )}
          <div
            className={
              collapsed
                ? `${classes.collapseIcon} item-arrow`
                : `${classes.expandIcon} item-arrow`
            }
          >
            <Icon className="align-middle">chevron_right</Icon>
          </div>
        </TouchRipple>

        <div
          ref={(el) => (this.elementRef = el)}
          className={`${classes['expansion-panel']} submenu`}
          style={
            collapsed
              ? { maxHeight: '0px' }
              : { maxHeight: `${this.componentHeight}px` }
          }
        >
          {children}
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(MatxVerticalNavExpansionPanel));
