import { withStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayoutRoute from '../../commons/Layout/AdminLayoutRoute';
import theme from '../../commons/Theme';
import GolbalLoading from '../../components/GolbalLoading';
import ModalTask from '../../components/Modal';
import { ADMIN_ROUTERS, ROUTERS } from '../../constants/index';
import configureStore, { history } from '../../redux/configStore';
import DefaultLayoutRoute from '../../commons/Layout/DefaultLayoutRoute';
import styles from './styles';
const store = configureStore();
class App extends Component {
  renderAdminRoutes = () => {
    let xhtml = null;
    xhtml = ADMIN_ROUTERS.map((route, match) => {
      return (
        <AdminLayoutRoute
          match={match}
          path={route.path}
          key={route.path}
          component={route.component}
          name={route.name}
          exact={route.exact}
        />
      );
    });
    return xhtml;
  };

  renderDefaultRoutes = () => {
    let xhtml = null;
    xhtml = ROUTERS.map((route) => {
      return (
        <DefaultLayoutRoute
          path={route.path}
          key={route.path}
          component={route.component}
          name={route.name}
          exact={route.exact}
        />
      );
    });
    return xhtml;
  };

  render() {
    return (
      <Provider store={store}>
        {/* // <BrowserRouter> */}
        <ConnectedRouter history={history}>
          <ThemeProvider theme={theme}>
            <GolbalLoading />
            <CssBaseline />
            <ToastContainer />
            <Switch>
              {this.renderDefaultRoutes()}
              {this.renderAdminRoutes()}
            </Switch>
            <ModalTask />
          </ThemeProvider>
        </ConnectedRouter>
        {/* </BrowserRouter> */}
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
